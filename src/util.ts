import path from 'path';
import fs from 'fs';
import glob from 'glob';

export const getSrcFiles = (sources: string[]): string[] => {
  const patterns = sources.map((arg) => {
    const posixabsPath = getAbsolutePath(getPosixPath(arg));
    return [posixabsPath, '**/*.ts'].join(path.posix.sep);
  });
  return glob.globSync(patterns);
};

export const getNamedExportsFiles = (namedExportsGlobs: string[]): string[] => {
  const patterns = namedExportsGlobs.map((arg) => getAbsolutePath(arg));
  return glob.globSync(patterns);
};

const getAbsolutePath = (posixPath: string): string => {
  return path.isAbsolute(posixPath) ? posixPath : convertAbsPath(posixPath);
};

const convertAbsPath = (globPattern: string): string => {
  const normalizeCwd = getPosixPath(process.cwd());
  return [normalizeCwd, globPattern].join(path.posix.sep);
};

const getPosixPath = (filePath: string): string => {
  return process.platform === 'win32'
    ? filePath.split(path.win32.sep).join(path.posix.sep)
    : filePath;
};

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
