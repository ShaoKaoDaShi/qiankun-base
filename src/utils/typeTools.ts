type PropertyType<T, K extends keyof T> = T[K]; // 类型属性的类型
type ArrayElementType<T> = T extends (infer U)[] ? U : never; // 数组元素的类型

export type { PropertyType, ArrayElementType };
// type MyOmit<T, K extends keyof T> = {
//     [Key in keyof T as Key extends K ? never : Key]: T[Key];
// };
// type MyOmit<T, U> = {
//     [K in MyExclude<keyof T, U>]: T[K];
// };
type MyPick<T, U> = {
    [K in MyExtract<keyof T, U>]: T[K];
};

type MyExclude<T, U> = T extends U ? never : T;
type MyExtract<T, U> = T extends U ? T : never;
interface A {
    a: number;
    b: string;
}
type C = Exclude<A, { a }>;
type F = Extract<A, { a }>;
type D = Omit<A, "a">;
type B = MyOmit<A, "a">;
type E = MyPick<A, "a">;

type G = "a" | "b" extends "a" ? true : false;
type H = keyof A;
type I = MyExclude<"a" | "b", "a">;

const fn = (v: boolean) => {
    if (v) return 1;
    else return 2;
};
type MyReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;
type a = MyReturnType<typeof fn>; // should be "1 | 2"

type Pick<T, K extends keyof T> = {
    [K in keyof T]: T[K];
};

type Omit<T, K> = {
    [key in keyof T as key extends K ? never : key]: T[key];
};

type MyOmit<T, K> = {
    [key in keyof T as key extends K ? never : key]: T[key];
};

type Exclude<T, K> = T extends K ? never : T;
type Extract<T, K> = T extends K ? T : never;
