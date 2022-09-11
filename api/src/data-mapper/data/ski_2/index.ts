import { IInputTrick } from "../../types";
import { IMapData } from "../../types";
import { teleports } from "./teleports";
import { triggers } from "./triggers";

export const getSki2Data = async (): Promise<IMapData> => {
  const tricksJson = await import("./tricks.json");
  const tricks: IInputTrick[] = tricksJson.default;

  return {
    teleports,
    tricks,
    triggers,
  };
};
