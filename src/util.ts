import * as path from 'path';
import * as fs from 'fs';
import * as glob from 'glob';

export const getSrcFiles = (sources: string[]): string[] => {
  const patterns = getAbsolutePathGlobPatterns(sources).map((arg) => {
    const posixPath = process.platform === 'win32' ? getPosixPath(arg) : arg;
    return [posixPath, '**/*.ts'].join(path.posix.sep);
  });
  return globSync(patterns);
};

export const getNamedExportsPatterns = (
  namedExportsFiles: string[]
): string[] => {
  const patterns = namedExportsFiles.map((arg) => {
    return path.isAbsolute(arg) ? arg : convertAbsPath(arg);
  });
  return globSync(patterns);
};

export const getAbsolutePathGlobPatterns = (patterns: string[]): string[] => {
  return patterns.map((arg) => {
    return path.isAbsolute(arg) ? getPosixPath(arg) : convertAbsPath(arg);
  });
};

const convertAbsPath = (relativePath: string): string => {
  const normalizeCwd = getPosixPath(process.cwd());
  return [normalizeCwd, relativePath].join(path.posix.sep);
};

const getPosixPath = (filePath: string): string => {
  if (process.platform === 'win32') {
    return filePath.split(path.win32.sep).join(path.posix.sep);
  } else {
    return filePath;
  }
};

function globSync(patterns: string[]): string[] {
  return patterns.reduce((acc, pattern) => {
    return acc.concat(
      glob.globSync([pattern]).map((file) => {
        return path.normalize(file);
      })
    );
  }, [] as string[]);
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
