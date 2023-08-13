type PropertyType<T, K extends keyof T> = T[K]; // 类型属性的类型
type ArrayElementType<T> = T extends (infer U)[] ? U : never; // 数组元素的类型

export type { PropertyType, ArrayElementType };
