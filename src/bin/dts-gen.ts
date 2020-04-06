#!/usr/bin/env node

import * as path from 'path';
import * as fs from 'fs';
import { program } from 'commander';
import { generate } from '..';
import { findConfig, globSync, deepestSharedRoot } from '../util';

program
  .version(require('../../package.json').version)
  .requiredOption('-s --sourcesDir <sources>', 'sources directory', collect, [])
  .requiredOption('-o --outputDir <outputDir>', 'dts file output directory')
  .parse(process.argv);

function collect(value: string, previous: string[]) {
  return previous.concat([value]);
}

const sources = program.sourcesDir as string[];
const root = path.resolve(deepestSharedRoot(sources))
const configPath = findConfig(root)
if (!configPath) {
  console.error('Can not found tsconfig.json')
  process.exit(1);
}

const patterns = sources.map(arg => path.join(arg, '**/*.ts'));
const dts = generate(globSync(patterns), configPath);
const dtsFilePath = path.join(program.outputDir, 'google.script.d.ts');
fs.writeFileSync(dtsFilePath, dts, { encoding: 'utf8' });
