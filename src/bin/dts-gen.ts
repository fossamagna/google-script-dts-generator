#!/usr/bin/env node

import * as path from 'path';
import * as fs from 'fs';
import { opts, program } from 'commander';
import { generate } from '..';
import { findConfig, globSync, deepestSharedRoot } from '../util';

program
  .version(require('../../package.json').version)
  .requiredOption('-s, --sourcesDir <sources>', 'sources directory', collect, [])
  .requiredOption('-o, --outputDir <outputDir>', 'dts file output directory')
  .option('--namedExportsFiles <glob>', 'A glob path pattern to generates a client-side TypeScript declaration (.d.ts) from named exports', collect, [])
  .option('--endpointsOnly', 'generate only PublicEndpoint interfaces', false)
  .parse(process.argv);

function collect(value: string, previous: string[]) {
  return previous.concat([value]);
}

const options = program.opts();
const sources = options.sourcesDir as string[];
const namedExportsFiles = options.namedExportsFiles as string[];
const endpointsOnly = options.endpointsOnly;
const root = path.resolve(deepestSharedRoot(sources))
const configPath = findConfig(root)
if (!configPath) {
  console.error('Can not found tsconfig.json')
  process.exit(1);
}

const cwd = process.cwd();
const patterns = sources
  .map(arg => path.isAbsolute(arg) ? arg : path.resolve(cwd, arg))
  .map(arg => path.join(arg, '**/*.ts'));
const namedExportsPatterns = namedExportsFiles
  .map(arg => path.isAbsolute(arg) ? arg : path.resolve(cwd, arg))

const dts = generate(globSync(patterns), configPath, globSync(namedExportsPatterns), endpointsOnly);

const dtsFilePath = path.join(options.outputDir, 'google.script.d.ts');
fs.writeFileSync(dtsFilePath, dts, { encoding: 'utf8' });
