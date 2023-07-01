interface IParams1 {
  attr1: string;
  attr2: number;
  attr3: {
    value: boolean
  }
}

interface IParams2 extends IParams1 {
  attr4: string;
}

function extendedInterfaceFunc(params: IParams2): number {
  return 123;
}
global.extendedInterfaceFunc = extendedInterfaceFunc;
