import { ResponseErrorDTO } from "./errors";

export const isResponseErrorObject = (
  value: any,
): value is ResponseErrorDTO => {
  return value?.status && value?.error;
};
