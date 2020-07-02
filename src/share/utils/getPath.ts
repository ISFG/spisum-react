// IE doesn't support Proxy, therefore must be proxy constants replaced with string
// lastPathMember, classPath, translationPath = these functions are in /config/webpack.config.js and are replace with "string-replace-loader"
// if is need to add another function for proxy constants, msut be added into /config/webpack.config.js
// DON'T USE PROXY CONSTANTS WITHOUT THESE FUNCTIONS!

export type ProxyProperty = Readonly<{
  path: string;
}>;

type ObjPathProxy<TRoot, T> = {
  [P in keyof T]: ObjPathProxy<TRoot, T[P]>;
};

type ObjProxyArg<TRoot, T> =
  | ObjPathProxy<TRoot, T>
  | ((p: ObjPathProxy<TRoot, TRoot>) => ObjPathProxy<TRoot, T>);

type InputType = object | string | number | boolean | undefined | null;

const pathSymbol = Symbol("Object path");

export const createProxy = <T>(
  path: PropertyKey[] = []
): ObjPathProxy<T, T> => {
  const proxy = new Proxy(
    { [pathSymbol]: path },
    {
      get(target, key) {
        if (key === pathSymbol) {
          return target[pathSymbol];
        }
        if (typeof key === "string") {
          const intKey = parseInt(key, 10);
          if (key === intKey.toString()) {
            key = intKey;
          }
        }
        return createProxy([...(path || []), key]);
      }
    }
  );
  return (proxy as InputType) as ObjPathProxy<T, T>;
};

export const getPath = <TRoot, T>(
  proxy: ObjProxyArg<TRoot, T> | InputType
): PropertyKey[] => {
  if (proxy == null) return [];
  if (typeof proxy === "function") {
    proxy = proxy(createProxy<TRoot>());
  }
  return (proxy as Omit<InputType, "undefined">)[pathSymbol];
};

export const lastPathMember = <TRoot, T>(
  proxy: ObjProxyArg<TRoot, T> | InputType
): ProxyProperty => {
  const path = getPath(proxy);

  if (!path || path.length === 0) return { path: "" };
  return { path: path[path.length - 1] as string };
};

export const classPath = <TRoot, T>(
  proxy: ObjProxyArg<TRoot, T> | InputType
): ProxyProperty => {
  const path = getPath(proxy);

  if (!path || path.length === 0) return { path: "" };
  if (path.length === 1) return { path: path[0].toString() };
  return { path: path.join(".") as string };
};

export const translationPath = <TRoot, T>(
  proxy: ObjProxyArg<TRoot, T> | InputType
): ProxyProperty => {
  const path = getPath(proxy);

  if (!path || path.length === 0) return { path: "" };
  if (path.length === 1) return { path: path[0].toString() };
  return { path: `${path[0].toString()}:${path.slice(1).join(".")}` };
};
