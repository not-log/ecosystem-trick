import { IInputTrickPathTrigger } from "../types";
import { normalizeTrickPathTriggersOrder } from "./transformers";

describe("[Transform] normalizeTrickPathTriggersOrder", () => {
  test("простой случай", () => {
    const caseInput: IInputTrickPathTrigger[] = [
      { trigger_id: 1, order: 0, passthrough: 0 },
      { trigger_id: 2, order: 1, passthrough: 0 },
      { trigger_id: 3, order: 2, passthrough: 0 },
      { trigger_id: 4, order: 1, passthrough: 1 }, // <-
    ];
    const caseOutput: IInputTrickPathTrigger[] = [
      { trigger_id: 1, order: 0, passthrough: 0 },
      { trigger_id: 4, order: 1, passthrough: 1 }, // <-
      { trigger_id: 2, order: 1, passthrough: 0 },
      { trigger_id: 3, order: 2, passthrough: 0 },
    ];
    expect(normalizeTrickPathTriggersOrder(caseInput)).toEqual(caseOutput);
  });

  test("несколько passthrough триггеров", () => {
    const caseInput: IInputTrickPathTrigger[] = [
      { trigger_id: 1, order: 0, passthrough: 0 },
      { trigger_id: 2, order: 1, passthrough: 0 },
      { trigger_id: 3, order: 2, passthrough: 0 },
      { trigger_id: 4, order: 1, passthrough: 1 }, // <-
      { trigger_id: 5, order: 1, passthrough: 1 }, // <-
    ];
    const caseOutput: IInputTrickPathTrigger[] = [
      { trigger_id: 1, order: 0, passthrough: 0 },
      { trigger_id: 4, order: 1, passthrough: 1 }, // <-
      { trigger_id: 5, order: 1, passthrough: 1 }, // <-
      { trigger_id: 2, order: 1, passthrough: 0 },
      { trigger_id: 3, order: 2, passthrough: 0 },
    ];
    expect(normalizeTrickPathTriggersOrder(caseInput)).toEqual(caseOutput);
  });

  test("несколько passthrough триггеров, разный order", () => {
    const caseInput: IInputTrickPathTrigger[] = [
      { trigger_id: 1, order: 0, passthrough: 0 },
      { trigger_id: 2, order: 1, passthrough: 0 },
      { trigger_id: 3, order: 2, passthrough: 0 },
      { trigger_id: 4, order: 3, passthrough: 0 },
      { trigger_id: 5, order: 1, passthrough: 1 }, // <-
      { trigger_id: 6, order: 2, passthrough: 1 }, // <-
    ];
    const caseOutput: IInputTrickPathTrigger[] = [
      { trigger_id: 1, order: 0, passthrough: 0 },
      { trigger_id: 5, order: 1, passthrough: 1 }, // <-
      { trigger_id: 2, order: 1, passthrough: 0 },
      { trigger_id: 6, order: 2, passthrough: 1 }, // <-
      { trigger_id: 3, order: 2, passthrough: 0 },
      { trigger_id: 4, order: 3, passthrough: 0 },
    ];
    expect(normalizeTrickPathTriggersOrder(caseInput)).toEqual(caseOutput);
  });
});
