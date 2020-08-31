import { SpisumNodeTypes } from "enums";

export const convertDateToYear = (value?: string | Date | null) => {
  if (!value) {
    return null;
  }

  try {
    return new Date(value).getFullYear();
  } catch {
    return null;
  }
};

export const isEmptyString = (value: string | null | undefined) =>
  !value || value.toString().trim() === "";

export const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// maybe use some librares for collors
export const getColorByChar = (char: string) => {
  char = char.toLowerCase();
  if (colorList.hasOwnProperty(char)) {
    return colorList[char];
  }
  return "#FFFFFF";
};

export const getDomainFromUsername = (username: string) => {
  const index = username.indexOf("@");
  return index === -1 ? "" : username.substr(index + 1);
};

export function mapKey2Value<T, K>(
  mapper: object,
  source?: T
): T | K | undefined | null {
  if (source === undefined || source === null) {
    return source;
  }

  const result: K = Object.keys(mapper).reduce((acc, key) => {
    if (source[key] !== undefined) {
      acc[mapper[key]] = source[key];
    }
    return acc;
  }, {} as K);

  return result;
}

// change color pallet pls :D
const colorList = {
  a: "#C0C0C0",
  b: "#6B8E23",
  c: "#FA8072",
  d: "#F4A460",
  e: "#7FFFD4",
  f: "#F4A460",
  g: "#FF7F50",
  h: "#808000",
  i: "#4682B4",
  j: "#A0522D",
  k: "#FFFF00",
  l: "#FFA500",
  m: "#FF6347",
  n: "#2E8B57",
  o: "#9370DB",
  p: "#483D8B",
  q: "#FFDEAD",
  r: "#CD853F",
  s: "#FFD700",
  t: "#FFDAB9",
  u: "#2F4F4F",
  v: "#3CB371",
  w: "#D2s691E",
  x: "#ADD8E6",
  y: "#B0C4DE",
  z: "#DDA0DD"
};

export const traverseNodeType = (
  nodeType: SpisumNodeTypes
): SpisumNodeTypes => {
  if (
    nodeType === SpisumNodeTypes.Document ||
    nodeType === SpisumNodeTypes.TakeDocumentForProcessing ||
    nodeType === SpisumNodeTypes.TakeDocumentProcessed
  ) {
    return SpisumNodeTypes.Document;
  }
  if (
    nodeType === SpisumNodeTypes.File ||
    nodeType === SpisumNodeTypes.TakeFileOpen ||
    nodeType === SpisumNodeTypes.TakeFileClosed
  ) {
    return SpisumNodeTypes.File;
  }
  if (
    nodeType === SpisumNodeTypes.Concept ||
    nodeType === SpisumNodeTypes.TakeConcept
  ) {
    return SpisumNodeTypes.Concept;
  }
  return nodeType;
};
