import * as ts from 'typescript';
import * as path from 'path';
import * as dom from 'dts-dom';
import { googleScriptDts } from './dts-template';

class Context {
  readonly checker: ts.TypeChecker;
  methods: dom.ObjectTypeMember[] = [];
  _interfaces: Map<string, dom.InterfaceDeclaration> = new Map();
  namedExportsFiles: string[] = [];
  
  registerInterface(name: string, itrf: dom.InterfaceDeclaration) {
    if (this._interfaces.has(name)) {
      return;
    }
    this._interfaces.set(name, itrf);
  }

  get interfaces() {
    return this._interfaces.values();
  }

  isNameExportTarget(node: ts.Node): boolean {
    return this.namedExportsFiles.includes(node.getSourceFile().fileName);
  }

  constructor(checker: ts.TypeChecker, namedExportsFiles: string[]) {
    this.checker = checker;
    this.namedExportsFiles = namedExportsFiles;
  }
}

const createVisitor = (program: ts.Program, context: Context) => {
  const checker = program.getTypeChecker();
  const visitor = (node: ts.Node): Context => {
    const methods: dom.ObjectTypeMember[] = [];
    if (isGlobalAssignmentExpression(node)) {
      const expression = node.expression as ts.BinaryExpression;
      const right = expression.right;
      const type = checker.getTypeAtLocation(right);
      const [callSignature] = type.getCallSignatures();
      if (callSignature) {
        const globalProperty = (expression.left as ts.PropertyAccessExpression);
        const name = globalProperty.name.getText();
        methods.push(createDomMethod(name, callSignature, context));
      }
    }
    if (context.isNameExportTarget(node)) {
      if (ts.isVariableStatement(node) && isNamedExport(node.modifiers)) {
        node.declarationList.declarations.forEach(declaration => {
          const name = declaration.name.getText();
          const initializer = declaration.initializer!;
          const type = checker.getTypeAtLocation(initializer);
          const [callSignature] = type.getCallSignatures();
          if (callSignature) {
            methods.push(createDomMethod(name, callSignature, context));
          }
        });
      }
      if (ts.isFunctionDeclaration(node) && isNamedExport(node.modifiers)) {
        const name = node.name?.getText();
        if (!name) {
          console.warn(`Name not found: ${node.getText()}`);
          return context;
        }
        const type = checker.getTypeAtLocation(node);
        const [callSignature] = type.getCallSignatures();
        if (callSignature) {
          methods.push(createDomMethod(name, callSignature, context));
        }
      }
      if (ts.isNamedExports(node)) {
        node.elements.forEach(element => {
          const name = element.name.getText();
          const type = checker.getTypeAtLocation(element);
          const [callSignature] = type.getCallSignatures();
          if (callSignature) {
            methods.push(createDomMethod(name, callSignature, context));
          }
        });
      }
    }
    context.methods.push(...methods);

    node.getChildren().forEach(child => visitor(child));

    return context;
  }
  return visitor;
}

const createDomMethod = (name: string, callSignature: ts.Signature, context: Context) => {
  const parameters = callSignature.parameters
  .map(p => toDomParameter(p, context))
  .filter((dp): dp is dom.Parameter => !!dp);
  const method = dom.create.method(name, parameters, dom.type.void);
  return method;
}

export const generate = (filenames: string[], configPath: string, namedExportsFiles: string[]): string =>  {
  const result = ts.readConfigFile(configPath, ts.sys.readFile);
  const config = ts.parseJsonConfigFileContent(
    result.config,
    ts.sys,
    path.dirname(configPath),
    undefined,
    configPath
  );
  const program = ts.createProgram(filenames, config.options);
  const context = new Context(program.getTypeChecker(), namedExportsFiles);
  const visitor = createVisitor(program, context);
  filenames.forEach(filename => {
    const source = program.getSourceFile(filename);
    if (source) {
      source.statements.map(s => visitor(s));
    }
  });
  return generateDts(context);
}

const generateDts = (context: Context) => {
  const irun = generateIRunDts(context.methods);
  const interfaces: string[] = [];
  for (const i of context.interfaces) {
    interfaces.push(dom.emit(i, {rootFlags: dom.ContextFlags.InAmbientNamespace}));
  }
  return googleScriptDts(dom.emit(irun, {rootFlags: dom.ContextFlags.InAmbientNamespace}), interfaces);
}

const generateIRunDts = (methods: dom.ObjectTypeMember[]) => {
  const irun = dom.create.interface('IRun');
  irun.members.push(...methods);
  irun.members.push(generateWithFailureHandlerDts());
  irun.members.push(generateWithSuccessHandlerDts());
  irun.members.push(generateWithUserObjectDts());
  return irun;
}

const generateWithFailureHandlerDts = () => {
  const callback = dom.create.functionType([
    dom.create.parameter('error', dom.create.namedTypeReference('Error')),
    dom.create.parameter('object', dom.type.any, dom.ParameterFlags.Optional)
  ], dom.type.void);
  const params = [dom.create.parameter('callback', callback)];
  const withFailureHandler = dom.create.method('withFailureHandler', params, dom.create.namedTypeReference('IRun'));
  withFailureHandler.jsDocComment = `Sets a callback function to run if the server-side function throws an exception. Without a failure handler, failures are logged to the JavaScript console. To override this, call withFailureHandler(null) or supply a failure handler that does nothing.
@param callback a client-side callback function to run if the server-side function throws an exception; the Error object is passed to the function as the first argument, and the user object (if any) is passed as a second argument`;
  return withFailureHandler;
};

const generateWithSuccessHandlerDts = () => {
  const callback = dom.create.functionType([
    dom.create.parameter('value', dom.type.any),
    dom.create.parameter('object', dom.type.any, dom.ParameterFlags.Optional)
  ], dom.type.void);
  const params = [dom.create.parameter('callback', callback)];
  const withSuccessHandler = dom.create.method('withSuccessHandler', params, dom.create.namedTypeReference('IRun'));
  withSuccessHandler.jsDocComment = `Sets a callback function to run if the server-side function returns successfully.
@param callback a client-side callback function to run if the server-side function returns successfully; the server's return value is passed to the function as the first argument, and the user object (if any) is passed as a second argument`;
  return withSuccessHandler;
};

const generateWithUserObjectDts = () => {
  const params = [dom.create.parameter('object', dom.type.object)];
  const withUserObject = dom.create.method('withUserObject', params, dom.create.namedTypeReference('IRun'));
  withUserObject.jsDocComment = `Sets an object to pass as a second parameter to the success and failure handlers.
@param {Object} object an object to pass as a second parameter to the success and failure handlers; because user objects are not sent to the server, they are not subject to the restrictions on parameters and return values for server calls. User objects cannot, however, be objects constructed with the new operator`;
  return withUserObject;
}

const isGlobalAssignmentExpression = (node: ts.Node): node is ts.ExpressionStatement => {
  if (ts.isExpressionStatement(node) && ts.isBinaryExpression(node.expression)) {
    const expresson = node.expression;
    const left = expresson.left;
    return ts.isPropertyAccessExpression(left) && left.expression.getText() === 'global';
  }
  return false;
}

const isNamedExport = (modifiers?: ts.ModifiersArray) => {
  return modifiers?.some(modfifier => modfifier.kind === ts.SyntaxKind.ExportKeyword) 
    && modifiers?.every(modfifier => modfifier.kind !== ts.SyntaxKind.DefaultKeyword)
}

function toDomParameter(symbol: ts.Symbol, context: Context): dom.Parameter | undefined {
  const name = symbol.name;
  const type = context.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);
  const domType = toDomType(type, context);
  if (!domType) {
    return;
  }
  return dom.create.parameter(name, domType);
}

function toDomType(type: ts.Type, context: Context): dom.Type | undefined {
  const flags = type.getFlags();
  if (flags & ts.TypeFlags.Boolean) {
    return dom.type.boolean
  }
  if (flags & ts.TypeFlags.String) {
    return dom.type.string
  }
  if (flags & ts.TypeFlags.Number) {
    return dom.type.number
  }
  if (type.isUnion()) {
    return dom.create.union(
      type.types
      .map(t => toDomType(t, context))
      .filter((dp): dp is dom.Type => !!dp)
    );
  }
  if (type.isClassOrInterface()) {
    const name = type.symbol.getName();
    const namedTypeRef = dom.create.namedTypeReference(type.symbol.getName());
    const members = type.symbol.members!;
    const properties: dom.ObjectTypeMember[] = [];
    members && members.forEach((v, k) => {
      const t = context.checker.getTypeOfSymbolAtLocation(v, v.valueDeclaration);
      const domType = toDomType(t, context);
      if (domType) {
        const property = dom.create.property(k.toString(), domType);
        properties.push(property);
      }
    })
    const interfaceDom = dom.create.interface(name);
    interfaceDom.members.push(...properties);
    context.registerInterface(name, interfaceDom);
    return namedTypeRef;
  }
  if (type.isIntersection()) {
    return dom.create.intersection(
      type.types
      .map(t => toDomType(t, context))
      .filter((dp): dp is dom.Type => !!dp)
    )
  }
  if (type.isStringLiteral()) {
    return dom.type.stringLiteral(type.value);
  }
  if (type.isNumberLiteral()) {
    return dom.type.numberLiteral(type.value);
  }
  if (flags & ts.TypeFlags.Object) {
    const objectType = type as ts.ObjectType;    
    if (objectType.objectFlags & ts.ObjectFlags.Anonymous) {
      const members = objectType.symbol.members!;
      const properties: dom.ObjectTypeMember[] = [];
      const [callSignature] = type.getCallSignatures();
      if (callSignature) { // is Function
        return;
      }
      members && members.forEach((v, k) => {
        const t = context.checker.getTypeOfSymbolAtLocation(v, v.valueDeclaration);
        const domType = toDomType(t, context);
        if (domType) {
          const property = dom.create.property(k.toString(), domType);
          properties.push(property);
        }
      })
      return dom.create.objectType(properties);
    }
    console.warn(`${ts.ObjectFlags[objectType.objectFlags]} is is unsupported object type. it is declarated as any type.`);
    return dom.type.any;
  }
  console.warn(`${ts.TypeFlags[type.getFlags()]} is unsupported type. it is declarated as any type.`);
  return dom.type.any;
}
