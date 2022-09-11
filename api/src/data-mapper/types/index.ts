import { Map, Trick, TrickPathTrigger, Trigger } from "@prisma/client";

import { IInputMapTeleport, IInputTrick, IInputTrigger } from "./input-types";

export * from "./input-types";
export * from "./output-types";

export interface IMapData {
  teleports: IInputMapTeleport[];
  tricks: IInputTrick[];
  triggers: IInputTrigger[];
}

export interface CurrentDatabaseData {
  maps: Map[];
  triggers: Trigger[];
  tricks: Trick[];
  trickPath: TrickPathTrigger[];
}

export type TriggerDetectionTypeDetector = (name: string) => number;
