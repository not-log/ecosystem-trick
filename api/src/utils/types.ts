export type SafeOmit<T, K extends keyof T> = Omit<T, K>;

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type Simplify<T> = T extends Function ? T : { [K in keyof T]: T[K] };
