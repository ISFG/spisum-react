const timestamp = 1582939664515;

export const secretEncrypt = (text: string) =>
  btoa(
    byteArrayToHex(
      byteArrayMultiply(hexToByteArray(hexEncode(text)), timestamp)
    )
  );

export const secretDecrypt = (token: string) =>
  hexDecode(
    byteArrayToHex(byteArrayDivision(hexToByteArray(atob(token)), timestamp))
  );
const byteArrayDivision = (A: number[], B: number) => {
  let num: number = 0;
  const result: number[] = [];

  if (A && A.length && B) {
    A.forEach((x) => {
      num = num * 256 + x;
      result.push(Math.floor(num / B));
      num = num % B;
    });
  }

  return result;
};

const byteArrayMultiply = (A: number[], B: number) => {
  let num: number = 0;
  const result: number[] = [];

  if (A && A.length && B) {
    for (let i = A.length - 1; i >= 0; i--) {
      num = num + A[i] * B;
      result.unshift(num % 256);
      num = Math.floor(num / 256);
    }

    while (num > 0) {
      result.unshift(num % 256);
      num = Math.floor(num / 256);
    }
  }

  return result;
};

const byteArrayToHex = (array: number[]) => {
  let hex: string = "";

  if (array && array.length) {
    for (const byte of array) {
      const hexNumber = byte.toString(16);
      hex += (hexNumber.length < 2 ? "0" : "") + hexNumber;
    }
  }

  return hex.replace(/^[0]+/, "");
};

const hexEncode = (text: string) => {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    result += text.charCodeAt(i).toString(16);
  }

  return result;
};

const hexDecode = (text: string) => {
  let result = "";

  for (const hex of text.match(/.{1,2}/g) || []) {
    result += String.fromCharCode(parseInt(hex, 16));
  }

  return result;
};

const hexToByteArray = (hex: string) => {
  const bytesv2: number[] = [];

  if (hex) {
    hex = hex.replace(/^[0]+/, "");

    if (hex.length % 2 !== 0) {
      hex = "0" + hex;
    }

    for (let i = 0; i < hex.length; i += 2) {
      bytesv2.push(parseInt(hex.substr(i, 2), 16));
    }
  }

  return bytesv2;
};
