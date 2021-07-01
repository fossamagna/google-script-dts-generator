function objectReturnFunc(): {
  attr1: string;
  attr2: number;
  attr3: {
    value: boolean;
  };
} {
  return {
    attr1: "adc",
    attr2: 123,
    attr3: {
      value: false
    }
  }
}
global.objectReturnFunc = objectReturnFunc;
