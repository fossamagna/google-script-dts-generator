import { generate } from '../index';
import {
  getAbsolutePathGlobPatterns,
  getNamedExportsPatterns,
  getSrcFiles,
} from '../util';
import path from 'path';
import * as fs from 'fs';
import {
  expect,
  describe,
  it,
  beforeAll,
  afterEach,
  afterAll,
  jest,
} from '@jest/globals';

const fixturesDir = path.join(__dirname, '../__fixtures__');

describe('generate', () => {

  it('can detect named export arrow function.', () => {
    const fixtures = [
      path.join(fixturesDir, 'named-export-arrow-function.ts')
    ];
    const namedExportsFiles = [
      path.join(fixturesDir, 'named-export-arrow-function.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, { namedExportsFiles });
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'named-export-arrow-function.d.ts'), { encoding: 'utf8' }));
  });

  it('can detect named export function expression', () => {
    const fixtures = [
      path.join(fixturesDir, 'named-export-function-expression.ts')
    ];
    const namedExportsFiles = [
      path.join(fixturesDir, 'named-export-function-expression.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, { namedExportsFiles });
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'named-export-function-expression.d.ts'), { encoding: 'utf8' }));
  });

  it('can detect named export function statement', () => {
    const fixtures = [
      path.join(fixturesDir, 'named-export-function-statement.ts')
    ];
    const namedExportsFiles = [
      path.join(fixturesDir, 'named-export-function-statement.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, { namedExportsFiles });
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'named-export-function-statement.d.ts'), { encoding: 'utf8' }));
  });

  it('can detect named export', () => {
    const fixtures = [
      path.join(fixturesDir, 'named-export.ts')
    ];
    const namedExportsFiles = [
      path.join(fixturesDir, 'named-export.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, { namedExportsFiles });
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'named-export.d.ts'), { encoding: 'utf8' }));
  });

  it('can detect named export alias', () => {
    const fixtures = [
      path.join(fixturesDir, 'named-export-alias.ts')
    ];
    const namedExportsFiles = [
      path.join(fixturesDir, 'named-export-alias.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, { namedExportsFiles });
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'named-export-alias.d.ts'), { encoding: 'utf8' }));
  });

  it('can detect arrow function assginment to global object.', () => {
    const fixtures = [
      path.join(fixturesDir, 'arrow-function.ts')
    ];
    const namedExportsFiles = [
      path.join(fixturesDir, 'arrow-function.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, { namedExportsFiles });
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'arrow-function.d.ts'), { encoding: 'utf8' }));
  });

  it('can detect function-expression assginment to global object.', () => {
    const fixtures = [
      path.join(fixturesDir, 'function-expression.ts')
    ];
    const namedExportsFiles = [
      path.join(fixturesDir, 'function-expression.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, { namedExportsFiles });
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'function-expression.d.ts'), { encoding: 'utf8' }));
  });

  it('can detect identifier assginment to global object.', () => {
    const fixtures = [
      path.join(fixturesDir, 'identifier.ts')
    ];
    const namedExportsFiles = [
      path.join(fixturesDir, 'identifier.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, { namedExportsFiles });
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'identifier.d.ts'), { encoding: 'utf8' }));
  });

  it('support primitive parameters', () => {
    const fixtures = [
      path.join(fixturesDir, 'primitive-parameters.ts')
    ];
    const namedExportsFiles = [
      path.join(fixturesDir, 'primitive-parameters.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, { namedExportsFiles });
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'primitive-parameters.d.ts'), { encoding: 'utf8' }));
  });

  it('support object parameters', () => {
    const fixtures = [
      path.join(fixturesDir, 'object-parameters.ts')
    ];
    const namedExportsFiles = [
      path.join(fixturesDir, 'object-parameters.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, { namedExportsFiles });
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'object-parameters.d.ts'), { encoding: 'utf8' }));
  });

  it('support class parameters', () => {
    const fixtures = [
      path.join(fixturesDir, 'class-parameters.ts')
    ];
    const namedExportsFiles = [
      path.join(fixturesDir, 'class-parameters.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, { namedExportsFiles });
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'class-parameters.d.ts'), { encoding: 'utf8' }));
  });

  it('support interface parameters', () => {
    const fixtures = [
      path.join(fixturesDir, 'interface-parameters.ts')
    ];
    const namedExportsFiles = [
      path.join(fixturesDir, 'interface-parameters.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, { namedExportsFiles });
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'interface-parameters.d.ts'), { encoding: 'utf8' }));
  });

  it('endpoints only when use endpointsOnly option', () => {
    const fixtures = [
      path.join(fixturesDir, 'interface-parameters.ts')
    ];
    const namedExportsFiles = [
      path.join(fixturesDir, 'interface-parameters.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, { namedExportsFiles, endpointsOnly: true });
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'interface-parameters-public-endpoints.d.ts'), { encoding: 'utf8' }));
  });

  it('support primitive return type', () => {
    const fixtures = [
      path.join(fixturesDir, 'primitive-return-type.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, {nonVoidReturnType: true, endpointsOnly: true});
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'primitive-return-type.d.ts'), { encoding: 'utf8' }));
  });

  it('support object return type', () => {
    const fixtures = [
      path.join(fixturesDir, 'object-return-type.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, {nonVoidReturnType: true, endpointsOnly: true});
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'object-return-type.d.ts'), { encoding: 'utf8' }));
  });

  it('support class return type', () => {
    const fixtures = [
      path.join(fixturesDir, 'class-return-type.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, {nonVoidReturnType: true, endpointsOnly: true});
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'class-return-type.d.ts'), { encoding: 'utf8' }));
  });

  it('support interface return type', () => {
    const fixtures = [
      path.join(fixturesDir, 'interface-return-type.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, {nonVoidReturnType: true, endpointsOnly: true});
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'interface-return-type.d.ts'), { encoding: 'utf8' }));
  });
});

describe('treat backslash', () => {
  const baseDir = path.resolve(__dirname, '..');
  const baseTestDir = 'testdir';
  const testDirPath = 'a/[b]/c';
  const testDirFullPath = path.join(baseDir, baseTestDir, testDirPath);
  const createFile = (fileName: string) => {
    const filePath = path.join(testDirFullPath, fileName);
    fs.writeFileSync(filePath, '', { encoding: 'utf-8' });
  };

  beforeAll(() => {
    fs.mkdirSync(testDirFullPath, { recursive: true });
    createFile('d.ts');
    createFile('e.ts');
    createFile('f.ts');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    fs.rmSync(path.join(baseDir, baseTestDir), {
      recursive: true,
      force: true,
    });
  });

  it('can replace to the posix delimiters from the windows one(relative path)', () => {
    Object.defineProperty(process, 'platform', {
      value: 'win32',
    });
    jest.spyOn(process, 'cwd').mockReturnValue('c:\\u01\\a\\b\\c');
    jest.spyOn(path, 'isAbsolute').mockImplementation(path.win32.isAbsolute);
    const testPath = './src';
    const paths = getAbsolutePathGlobPatterns([testPath]);
    expect(paths.length).toBe(1);
    expect(paths[0]).toBe('c:/u01/a/b/c/./src');
  });

  it('can replace to the posix delimiters from the windows one(absolute path)', () => {
    Object.defineProperty(process, 'platform', {
      value: 'win32',
    });
    jest.spyOn(process, 'cwd').mockReturnValue('c:\\u01\\a\\b\\c');
    jest.spyOn(path, 'isAbsolute').mockImplementation(path.win32.isAbsolute);
    const testPath = 'c:/x\\y\\z\\src';
    const paths = getAbsolutePathGlobPatterns([testPath]);
    expect(paths.length).toBe(1);
    expect(paths[0]).toBe('c:/x/y/z/src');
  });

  it('can treat backslash as escape(relative path)', () => {
    Object.defineProperty(process, 'platform', {
      value: 'win32',
    });
    process.chdir(path.join(baseDir, baseTestDir));
    const cwd = process.cwd();
    jest
      .spyOn(process, 'cwd')
      .mockReturnValue(cwd.split(path.posix.sep).join(path.win32.sep));
    const patterns = ['a/\\[b\\]/c/[a-e].ts'];
    const files = getNamedExportsPatterns(patterns);
    expect(files.length).toBe(2);
  });

  it('can treat backslash as escape(absolute path)', () => {
    Object.defineProperty(process, 'platform', {
      value: 'win32',
    });
    process.chdir(path.join(baseDir, baseTestDir));
    const cwd = process.cwd();
    jest
      .spyOn(process, 'cwd')
      .mockReturnValue(cwd.split(path.posix.sep).join(path.win32.sep));
    const patterns = [[cwd, 'a/\\[b\\]/c/[a-e].ts'].join(path.posix.sep)];
    const files = getNamedExportsPatterns(patterns);
    expect(files.length).toBe(2);
  });

  it('support relative path with the backslash', () => {
    Object.defineProperty(process, 'platform', {
      value: 'win32',
    });
    process.chdir(path.join(baseDir, baseTestDir));
    const cwd = process.cwd();
    jest
      .spyOn(process, 'cwd')
      .mockReturnValue(cwd.split(path.posix.sep).join(path.win32.sep));
    const patterns = ['.\\a'];
    const files = getSrcFiles(patterns);
    expect(files.length).toBe(3);
  });

  it('support relative path with the slash', () => {
    Object.defineProperty(process, 'platform', {
      value: 'linux',
    });
    process.chdir(path.join(baseDir, baseTestDir));
    const patterns = ['./a'];
    const files = getSrcFiles(patterns);
    expect(files.length).toBe(3);
  });
});