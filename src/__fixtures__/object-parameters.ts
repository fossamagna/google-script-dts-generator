const params = {
  attr1: "adc",
  attr2: 123,
  attr3: {
    value: false
  }
}

function objectParamsFunc(params: {
  attr1: string;
  attr2: number;
  attr3: {
    value: boolean;
  };
}): number {
  return 123;
}
global.objectParamsFunc = objectParamsFunc;
