import { format, isValid, parseISO } from "date-fns";
import cs from "date-fns/locale/cs";

export const formatDate = (date?: string, timeFormat?: string) => {
  if (date && isValid(parseISO(date))) {
    if (timeFormat) {
      return format(parseISO(date), timeFormat, { locale: cs });
    } else {
      return format(parseISO(date), "dd.MM.yyyy HH:mm:ss", { locale: cs });
    }
  }
  return date;
};

export const convertResponse = <T extends {}>(response: T) => {
  if (typeof response !== "object") return response;
  const convertedResponse: T = {} as T;
  // tslint:disable-next-line: forin
  for (const key in response) {
    if (response[key] && response[key] instanceof Array) {
      response[key] = (convertResponsearray(
        (response[key] as unknown) as []
      ) as unknown) as T[Extract<keyof T, string>];
    } else if (response[key] && typeof response[key] === "object") {
      response[key] = convertResponse(response[key]);
    }
    if (key.indexOf(":") !== -1) {
      const prefix = key.substr(0, key.indexOf(":"));
      if (!convertedResponse[prefix]) convertedResponse[prefix] = {};
      convertedResponse[prefix][key.substr(key.lastIndexOf(":") + 1)] =
        response[key];
    } else {
      convertedResponse[key] = response[key];
    }
  }
  return convertedResponse;
};

export const convertProps = <T extends {}>(body: T, prefix = "ssl"): object => {
  return Object.keys(body).reduce((acc, key) => {
    acc[`${prefix}:${key}`] = body[key];
    return acc;
  }, {});
};

type Props = {
  createdAt?: Date | null;
  pid?: string;
  form?: string;
  documentType?: string;
  deliveryTime?: Date;
  owner?: string;
};

export const omitFormiddenProps = <T extends Props>(
  payload: T
): Pick<
  T,
  Exclude<
    keyof T,
    "pid" | "form" | "documentType" | "deliveryTime" | "owner" | "createdAt"
  >
> => {
  const {
    pid,
    form,
    documentType,
    deliveryTime,
    owner,
    createdAt,
    ...rest
  } = payload;

  return rest;
};

export const convertPayload = <T extends {}>(payload: T) => {
  const convertedPayload: T = {} as T;
  if (typeof payload !== "object") return payload;
  for (const key in payload) {
    if (!payload.hasOwnProperty(key)) continue;
    const child = payload[key];
    if (typeof child !== "object") {
      convertedPayload[key] = payload[key];
      continue;
    }
    for (const childKey in child) {
      if (!(child as {}).hasOwnProperty(childKey)) continue;
      convertedPayload[`${key}:${childKey}`] = child[childKey];
    }
  }
  return convertedPayload;
};

const convertResponsearray = <T>(array: T[]) => {
  const convertedResponse: T[] = [];
  array.forEach((x) => convertedResponse.push(convertResponse(x)));
  return convertedResponse;
};

export const getPropertySortName = (property: string) => {
  const key = "properties.";
  const index = property.lastIndexOf(key);
  if (index !== -1) {
    return transformProperty(property.substr(index + key.length));
  }
  return property;
};

const transformProperty = (property: string) => {
  const index = property.indexOf(".");
  if (index !== -1) {
    return `${property.substr(0, index)}:${property.substr(
      property.lastIndexOf(".") + 1
    )}`;
  }
  return property;
};
