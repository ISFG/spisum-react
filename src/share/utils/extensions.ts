/* eslint-disable no-extend-native */
String.prototype.trimEnd = function (char: string) {
  if (this.endsWith(char)) {
    return this.substr(0, this.length - char.length);
  }
  return this.toString();
};
