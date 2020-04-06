interface IParams {
  attr1: string;
  attr2: number;
  attr3: {
    value: boolean
  }
}

function interfaceParamsFunc(params: IParams): number {
  return 123;
}
global.interfaceParamsFunc = interfaceParamsFunc;
