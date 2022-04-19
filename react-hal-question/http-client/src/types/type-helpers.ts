declare global {
  type MethodNames<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
  }[keyof T];

  // prettier-ignore
  type OmitInvalidJSON<T> =
    & {
        [K in Exclude<NeverOptionalProps<T>[keyof T], MethodNames<T>> & (string | number)]:
          T[K] extends symbol | undefined ? never :
          T[K] extends JSONPrimitive ? T[K] :
          T[K] extends (infer U)[] ? OmitInvalidJSON<U>[] :
          OmitInvalidJSON<T[K]>;
      }
    & {
      [K in Exclude<NeverRequiredProps<T>[keyof T], MethodNames<T>> & (string | number)]?:
        T[K] extends symbol | undefined ? never :
        T[K] extends JSONPrimitive ? T[K] :
        T[K] extends (infer U)[] ? OmitInvalidJSON<U>[] :
        OmitInvalidJSON<T[K]>;
    };
}

type NeverRequiredProps<T> = {
  [K in keyof T & keyof Required<T>]: T[K] extends Required<T>[K] ? never : K;
};

type NeverOptionalProps<T> = {
  [K in keyof T & keyof Required<T>]: T[K] extends Required<T>[K] ? K : never;
};

type JSONPrimitive = string | number | boolean | null;

export {};
