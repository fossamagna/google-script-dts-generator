function boo(arg1: string, arg2: boolean): number {
  console.log(arg1, arg2)
  return 123;
}

export {boo as foo}
