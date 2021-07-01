class Return {
  attr1 = "adc";
  attr2 = 123;
  attr3 = {
    value: false
  }
}

function classReturnFunc(): Return {
  return new Return();
}
global.classReturnFunc = classReturnFunc;
