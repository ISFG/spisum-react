import React from "react";
import { DialogContentPropsType } from "../dialog/_types";

export interface OwnProps {
  text?: string;
}

const Component = ({ text }: OwnProps & DialogContentPropsType) => {
  return <span>{text}</span>;
};

export default Component;
