import { SslPathsType } from "core/features/login/_types";
import { merge } from "lodash";
import { isEmptyString } from "./utils";

interface QueryType {
  ancestors?: string[] | null;
  paths?: string[] | null;
  type: string[];
  where?: string;
}

export const alfrescoQuery = (query: QueryType) => {
  const ancestors =
    query &&
    query.ancestors &&
    query.ancestors.filter((x) => !isEmptyString(x));
  const paths =
    query && query.paths && query.paths.filter((x) => !isEmptyString(x));

  const queries: string[] = [];

  if (paths) {
    queries.push(`(${paths.map((x) => queryPath(x)).join(" OR ")})`);
  }

  if (ancestors) {
    queries.push(`(${ancestors.map((x) => queryAncestors(x)).join(" OR ")})`);
  }

  if (query.type && query.type.length) {
    queries.push(`(${query.type.map((x) => `TYPE:'${x}'`).join(" OR ")})`);
  }

  if (!isEmptyString(query.where)) {
    queries.push(`(${query.where})`);
  }

  return (queries.length && queries.join(" AND ")) || "";
};

const queryAncestors = (id: string) =>
  id && `ANCESTOR:'workspace://SpacesStore/${id}'`;

const queryPath = (path: string) =>
  path &&
  `PATH:'/app:company_home/st:sites/cm:${path.replace(/\//g, "/cm:")}//*'`;

export const getQueryPath = (
  paths?: SslPathsType[] | null,
  group?: string | null,
  ...args: string[]
) => {
  if (!paths || !paths.length || !args || !args.length) {
    return null;
  }

  let result: SslPathsType | undefined;

  for (const name of args) {
    result = merge({}, getChild(paths!, name));
    paths = result?.childs;
  }

  if (group && result && result.path) {
    result.path = result.path.replace(
      "documentLibrary",
      `documentLibrary/${group}`
    );
  }

  return result;
};

const getChild = (paths: SslPathsType[], name: string) => {
  if (!paths || !paths.length) {
    return undefined;
  }
  return paths.find((x) => x.name === name);
};

export const getRelativePath = (
  paths?: SslPathsType[] | null,
  group?: string | null,
  ...args: string[]
) => {
  const site = getQueryPath(paths, null, ...args);

  return site && site.path
    ? `Sites/${
        group
          ? site.path.replace("documentLibrary", `documentLibrary/${group}`)
          : site.path
      }`
    : "";
};

export const getSearchTerm = (term: string) => {
  term = term
    .replace(/ /g, "+")
    .replace(/[^a-zA-Z0-9_@$&\-+]/, "")
    .trim();
  const searchFields = ["ssl:pid", "ssl:subject", "ssl:sender"];

  return searchFields.map((x) => `${x}:*${term}*`).join(" OR ");
};
