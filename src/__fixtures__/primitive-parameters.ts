function primitiveParamsFunc(
  arg1: string,
  arg2: boolean,
  arg3: number,
  arg4: "abc",
  arg5: 123): number {
  return 123;
}
global.primitiveParamsFunc = primitiveParamsFunc;
