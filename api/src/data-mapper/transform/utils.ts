export const joinInsertValues = (...values: unknown[]): string => {
  return values
    .map((value) => {
      if (value === null) return "NULL";
      if (typeof value === "boolean") return Number(value);
      return typeof value === "string" ? `'${escapeQuotes(value)}'` : String(value);
    })
    .join(", ");
};

export const escapeQuotes = (value: string): string => {
  return value.replace(/\\/g, "\\\\").replace(/\$/g, "\\$").replace(/'/g, "\\'").replace(/"/g, '\\"');
};

export const numbersToString = (numbers: (number | null)[]): string => {
  return numbers.map((number) => number || 0).join(";");
};
