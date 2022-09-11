import { IInputTrickPathTrigger } from "../types";

export const normalizeTrickPathTriggersOrder = (trickTriggers: IInputTrickPathTrigger[]): IInputTrickPathTrigger[] => {
  return trickTriggers.sort((a, b) => {
    if (a.order === b.order && a.passthrough && !b.passthrough) {
      return -1;
    }
    return a.order - b.order;
  });
};
