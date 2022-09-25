import { getSki2Data } from "./data/ski_2";
import { getSki2TriggerDetectionType } from "./transform";
import { MapDataGenerator, TriggerTypeGenerator } from "./types";

export const getMapGenerators = (map: string): [MapDataGenerator, TriggerTypeGenerator] | null => {
  switch (map) {
    case "surf_ski_2_trick":
      return [getSki2Data, getSki2TriggerDetectionType];
    default:
      return null;
  }
};
