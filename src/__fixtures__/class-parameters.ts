class Params {
  attr1 = "adc";
  attr2 = 123;
  attr3 = {
    value: false
  }
}

function classParamsFunc(params: Params): number {
  return 123;
}
global.classParamsFunc = classParamsFunc;
