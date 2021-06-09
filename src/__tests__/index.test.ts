import { generate } from '../index';
import * as path from 'path';
import * as fs from 'fs';

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
    const dts = generate(fixtures, configPath, namedExportsFiles);
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
    const dts = generate(fixtures, configPath, namedExportsFiles);
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
    const dts = generate(fixtures, configPath, namedExportsFiles);
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
    const dts = generate(fixtures, configPath, namedExportsFiles);
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
    const dts = generate(fixtures, configPath, namedExportsFiles);
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
    const dts = generate(fixtures, configPath, namedExportsFiles);
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
    const dts = generate(fixtures, configPath, namedExportsFiles);
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
    const dts = generate(fixtures, configPath, namedExportsFiles);
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
    const dts = generate(fixtures, configPath, namedExportsFiles);
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
    const dts = generate(fixtures, configPath, namedExportsFiles);
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
    const dts = generate(fixtures, configPath, namedExportsFiles);
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
    const dts = generate(fixtures, configPath, namedExportsFiles);
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'interface-parameters.d.ts'), { encoding: 'utf8' }));
  });
});