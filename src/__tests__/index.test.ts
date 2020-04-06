import { generate } from '../index';
import * as path from 'path';
import * as fs from 'fs';

const fixturesDir = path.join(__dirname, '../__fixtures__');

describe('generate', () => {

  describe('function detection', () => {});

  it('can detect arrow function assginment to global object.', () => {
    const fixtures = [
      path.join(fixturesDir, 'arrow-function.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath);
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'arrow-function.d.ts'), { encoding: 'utf8' }));
  });

  it('can detect function-expression assginment to global object.', () => {
    const fixtures = [
      path.join(fixturesDir, 'function-expression.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath);
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'function-expression.d.ts'), { encoding: 'utf8' }));
  });

  it('can detect identifier assginment to global object.', () => {
    const fixtures = [
      path.join(fixturesDir, 'identifier.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath);
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'identifier.d.ts'), { encoding: 'utf8' }));
  });

  it('support primitive parameters', () => {
    const fixtures = [
      path.join(fixturesDir, 'primitive-parameters.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath);
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'primitive-parameters.d.ts'), { encoding: 'utf8' }));
  });

  it('support object parameters', () => {
    const fixtures = [
      path.join(fixturesDir, 'object-parameters.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath);
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'object-parameters.d.ts'), { encoding: 'utf8' }));
  });

  it('support class parameters', () => {
    const fixtures = [
      path.join(fixturesDir, 'class-parameters.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath);
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'class-parameters.d.ts'), { encoding: 'utf8' }));
  });

  it('support interface parameters', () => {
    const fixtures = [
      path.join(fixturesDir, 'interface-parameters.ts')
    ];
    const configPath = path.join(fixturesDir, 'tsconfig.json');
    const dts = generate(fixtures, configPath);
    expect(dts).toBe(fs.readFileSync(path.join(fixturesDir, 'interface-parameters.d.ts'), { encoding: 'utf8' }));
  });
});