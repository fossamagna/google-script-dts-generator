#!/usr/bin/env node

import * as path from 'path';
import * as fs from 'fs';
import { opts, program } from 'commander';
import { generate } from '..';
import {
  findConfig,
  deepestSharedRoot,
  getNamedExportsPatterns,
  getSrcFiles,
} from '../util';

program
  .version(require('../../package.json').version)
  .requiredOption('-s, --sourcesDir <sources>', 'sources directory', collect, [])
  .requiredOption('-o, --outputDir <outputDir>', 'dts file output directory')
  .option('--namedExportsFiles <glob>', 'A glob path pattern to generates a client-side TypeScript declaration (.d.ts) from named exports', collect, [])
  .option('--endpointsOnly', 'generate only PublicEndpoint interfaces', false)
  .option('--nonVoidReturnType', 'generate return type of server-side function as return type of client-side function.', false)
  .parse(process.argv);

function collect(value: string, previous: string[]) {
  return previous.concat([value]);
}

const options = program.opts();
const sources = options.sourcesDir as string[];
const namedExportsFiles = options.namedExportsFiles as string[];
const endpointsOnly = !!options.endpointsOnly;
const nonVoidReturnType = !!options.nonVoidReturnType;
const root = path.resolve(deepestSharedRoot(sources))
const configPath = findConfig(root)
if (!configPath) {
  console.error('Can not found tsconfig.json')
  process.exit(1);
}

const generateOptions = {
  namedExportsFiles: getNamedExportsPatterns(namedExportsFiles),
  endpointsOnly,
  nonVoidReturnType
}
const dts = generate(getSrcFiles(sources), configPath, generateOptions);

const dtsFilePath = path.join(options.outputDir, 'google.script.d.ts');
fs.writeFileSync(dtsFilePath, dts, { encoding: 'utf8' });
