import { generate } from '../index';
import {
  getNamedExportsFiles,
  getSrcFiles,
} from '../util';
import path from 'path';
import fs from 'fs';
import glob from 'glob';

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
    expect(dts).toMatchSnapshot();
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
    expect(dts).toMatchSnapshot();
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
    expect(dts).toMatchSnapshot();
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
    expect(dts).toMatchSnapshot();
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
    expect(dts).toMatchSnapshot();
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
    expect(dts).toMatchSnapshot();
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
    expect(dts).toMatchSnapshot();
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
    expect(dts).toMatchSnapshot();
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
    expect(dts).toMatchSnapshot();
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
    expect(dts).toMatchSnapshot();
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
    expect(dts).toMatchSnapshot();
  });

  it('support exteneded interface parameters', () => {
    const fixtures = [path.join(fixturesDir, 'interface-extended-parameters.ts')];
    const namedExportsFiles = [path.join(fixturesDir, 'interface-extended-parameters.ts')];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, { namedExportsFiles });
    expect(dts).toMatchSnapshot();
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
    expect(dts).toMatchSnapshot();
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
    expect(dts).toMatchSnapshot();
  });

  it('support primitive return type', () => {
    const fixtures = [
      path.join(fixturesDir, 'primitive-return-type.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, {nonVoidReturnType: true, endpointsOnly: true});
    expect(dts).toMatchSnapshot();
  });

  it('support object return type', () => {
    const fixtures = [
      path.join(fixturesDir, 'object-return-type.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, {nonVoidReturnType: true, endpointsOnly: true});
    expect(dts).toMatchSnapshot();
  });

  it('support class return type', () => {
    const fixtures = [
      path.join(fixturesDir, 'class-return-type.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, {nonVoidReturnType: true, endpointsOnly: true});
    expect(dts).toMatchSnapshot();
  });

  it('support interface return type', () => {
    const fixtures = [
      path.join(fixturesDir, 'interface-return-type.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath, {nonVoidReturnType: true, endpointsOnly: true});
    expect(dts).toMatchSnapshot();
  });
});

describe('Support the Windows and linux Platform', () => {
  const orgPlatform = process.platform;
  afterEach(() => {
    jest.restoreAllMocks();

    Object.defineProperty(process, 'platform', {
      value: orgPlatform,
    });
  });
  it.each([
    ['relative path', 'win32', 'c:\\x\\y\\z', '.\\src', ['c:/x/y/z/./src/**/*.ts']],
    ['absolute path', 'win32', 'c:\\x\\y\\z', 'c:\\a\\b\\c\\src', ['c:/a/b/c/src/**/*.ts']],
    ['relative path', 'linux', '/x/y/z', './src', ['/x/y/z/./src/**/*.ts']],
    ['absolute path', 'linux', '/x/y/z', '/a/b/c/src', ['/a/b/c/src/**/*.ts']],
  ])('Can get source code path(%s @%s)', (_title, platform, cwd, input, expected) => {
    Object.defineProperty(process, 'platform', {
      value: platform,
    });

    jest.spyOn(process, 'cwd').mockReturnValue(cwd);
    if (orgPlatform !== 'win32' && platform === 'win32') {
      jest.spyOn(path, 'isAbsolute').mockImplementation(path.win32.isAbsolute);
    } else if (orgPlatform === 'win32' && platform !== 'win32') {
      jest.spyOn(path, 'isAbsolute').mockImplementation(path.posix.isAbsolute);
    }
    const spyGlob = jest.spyOn(glob, 'globSync');
    getSrcFiles([input]);
    expect(spyGlob).toBeCalledTimes(1);
    expect(spyGlob).lastCalledWith(expected);
  });

  it.each([
    ['relative path', 'win32', 'c:\\x', 'a/\\[b\\]/c/[a-e].ts', ['c:/x/a/\\[b\\]/c/[a-e].ts']],
    ['absolute path', 'win32', 'c:\\x', 'c:/a/\\[b\\]/c/[a-e].ts', ['c:/a/\\[b\\]/c/[a-e].ts']],
    ['relative path', 'linux', '/x/y/z', 'a/\\[b\\]/c/[a-e].ts', ['/x/y/z/a/\\[b\\]/c/[a-e].ts']],
    ['absolute path', 'linux', '/x/y/z', '/x/a/\\[b\\]/c/[a-e].ts', ['/x/a/\\[b\\]/c/[a-e].ts']],
  ])('Can get namedExportFiles(%s @%s)', (_title, platform, cwd, input, expected) => {
    Object.defineProperty(process, 'platform', {
      value: platform,
    });

    jest.spyOn(process, 'cwd').mockReturnValue(cwd);
    if (orgPlatform !== 'win32' && platform === 'win32') {
      jest.spyOn(path, 'isAbsolute').mockImplementation(path.win32.isAbsolute);
    } else if (orgPlatform === 'win32' && platform !== 'win32') {
      jest.spyOn(path, 'isAbsolute').mockImplementation(path.posix.isAbsolute);
    }
    const spyGlob = jest.spyOn(glob, 'globSync');
    getNamedExportsFiles([input]);
    expect(spyGlob).toBeCalledTimes(1);
    expect(spyGlob).lastCalledWith(expected);
  });
});