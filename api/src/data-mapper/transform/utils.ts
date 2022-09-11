export const joinInsertValues = (...values: unknown[]): string => {
  return values
    .map((value) => {
      if (value === null) return "NULL";
      return typeof value === "string" ? `'${escapeQuotes(value)}'` : String(value);
    })
    .join(", ");
};

export const escapeQuotes = (value: string): string => {
  return value.replace(/\\/g, "\\\\").replace(/\$/g, "\\$").replace(/'/g, "\\'").replace(/"/g, '\\"');
};