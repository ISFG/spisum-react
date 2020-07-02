import React from "react";

export const getHtmlMultilineValue = (...args: (string | undefined)[]) => {
  const output = [];
  for (const arg of args) {
    if (arg) {
      output.push(arg);
    }
  }
  return output.map((x, i) => (
    <>
      {x}
      {i < output.length - 1 && <br />}
    </>
  ));
};
