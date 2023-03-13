import * as path from 'path';
import * as fs from 'fs';
import * as glob from 'glob';

export function globSync(patterns: string[]): string[] {
  return patterns.reduce((acc, pattern) => acc.concat(glob.globSync([pattern])), [] as string[])
}

export function findConfig(
  baseDir: string,
  _exists: (filePath: string) => boolean = exists // for test
): string | undefined {
  const configFileName = 'tsconfig.json'

  function loop(dir: string): string | undefined {
    const parentPath = path.dirname(dir)
    // It is root directory if parent and current dirname are the same
    if (dir === parentPath) {
      return undefined
    }

    const configPath = path.join(dir, configFileName)
    if (_exists(configPath)) {
      return configPath
    }

    return loop(parentPath)
  }
  return loop(baseDir)
}

function exists(filePath: string): boolean {
  return fs.existsSync(filePath)
}

export function deepestSharedRoot(pathNames: string[]): string {
  let root: string[] = pathNames[0].split(path.sep)
  pathNames.slice(1).forEach(pathName => {
    const dirs = pathName.split(path.sep)
    dirs.forEach((dir, i) => {
      if (root[i] !== dir) {
        root = root.slice(0, i)
      }
    })
  })
  return root.join(path.sep)
}
