import { PrismaClient } from "@prisma/client";

import { getSki2Data } from "./data/ski_2";
import { exportMappedTrickPathTriggers, exportMappedTricks, exportMappedTriggers } from "./export";
import {
  getMappedTrickPathTriggers,
  getMappedTricks,
  getMappedTriggers,
  getSki2TriggerDetectionType,
} from "./transform";
import { CurrentDatabaseData, IMapData, TriggerDetectionTypeDetector } from "./types";

// TODO сделать вызов функций экспорта по командам
// понадобится сделать резолверы для get*Data и get*TriggerDetectionType по названию карты
exportMapData("surf_ski_2_trick", getSki2Data, getSki2TriggerDetectionType);

async function exportMapData(
  localMapName: string,
  getMapData: () => Promise<IMapData>,
  typeDetector: TriggerDetectionTypeDetector,
) {
  const prisma = new PrismaClient();

  // get local data
  await prisma.$connect();
  const [maps, triggers, tricks, trickPath] = await Promise.all([
    prisma.map.findMany(),
    prisma.trigger.findMany(),
    prisma.trick.findMany(),
    prisma.trickPathTrigger.findMany(),
  ]);
  await prisma.$disconnect();

  const currentDatabaseData: CurrentDatabaseData = {
    maps,
    triggers,
    tricks,
    trickPath,
  };

  const localMapId = maps.find((map) => map.name === localMapName)?.id;

  if (!localMapId) return;

  // maps data
  const mapData = await getMapData();

  /* export */
  exportTriggers(mapData, localMapName, localMapId, typeDetector);
  // exportTricks(mapData, localMapName, localMapId);
  exportTrickPathTriggers(mapData, currentDatabaseData, localMapName, localMapId);
}

function exportTriggers(
  mapData: IMapData,
  localMapName: string,
  localMapId: number,
  typeDetector: TriggerDetectionTypeDetector,
) {
  const outputTriggers = getMappedTriggers(mapData.triggers, localMapId, typeDetector);

  const date = new Date();
  exportMappedTriggers(date, mapData.triggers, outputTriggers, localMapName, localMapId);
}

function exportTricks(mapData: IMapData, localMapName: string, localMapId: number) {
  const outputTricks = getMappedTricks(mapData.tricks, localMapId);

  const date = new Date();
  exportMappedTricks(date, mapData.tricks, outputTricks, localMapName, localMapId);
}

function exportTrickPathTriggers(
  mapData: IMapData,
  currentDatabaseData: CurrentDatabaseData,
  localMapName: string,
  localMapId: number,
) {
  const outputTrickPathTriggers = getMappedTrickPathTriggers(mapData, currentDatabaseData, localMapId);

  const inputTrickPathTriggers = mapData.tricks.flatMap((trick) => trick.trick_sequence);

  const date = new Date();
  exportMappedTrickPathTriggers(date, inputTrickPathTriggers, outputTrickPathTriggers, localMapName, localMapId);
}
