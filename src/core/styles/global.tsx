import { Global } from "@emotion/core";
import React from "react";

export const GlobalStyles = () => {
  return (
    <Global
      styles={{
        ".MuiFormControl-root.MuiTextField-root": {
          paddingBottom: "1.5em"
        },
        ".MuiFormHelperText-root.Mui-error": {
          bottom: 0,
          position: "absolute"
        }
      }}
    />
  );
};
