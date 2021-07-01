function returnNumber(): number {
  return 123;
}
function returnString(): string {
  return "hello";
}
function returnBoolean(): boolean {
  return true;
}
function returnUndefined(): undefined {
  return;
}
function returnNull(): null {
  return null;
}
global.returnNumber = returnNumber;
global.returnString = returnString;
global.returnBoolean = returnBoolean;
global.returnUndefined = returnUndefined;
global.returnNull = returnNull;
