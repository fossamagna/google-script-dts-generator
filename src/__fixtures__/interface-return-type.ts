interface IReturn {
  attr1: string;
  attr2: number;
  attr3: {
    value: boolean
  }
}

function interfaceReturnFunc(): IReturn {
  return {
    attr1: "hi",
    attr2: 123,
    attr3: {
      value: false
    }
  };
}
global.interfaceReturnFunc = interfaceReturnFunc;
