/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";

import { ActionKeys, dataExportPrompt } from "../prompt";
import { exportMappedTrickPathTriggers, exportMappedTricks, exportMappedTriggers } from "./export";
import { exportMappedTeleports } from "./export/teleports";
import { getMappedTrickPathTriggers, getMappedTricks, getMappedTriggers } from "./transform";
import { getMappedTeleports } from "./transform/mappers";
import { CurrentDatabaseData, IMapData, TriggerTypeGenerator } from "./types";
import { MapDataGenerator } from "./types/index";
import { getMapGenerators } from "./utils";

export async function runDataMapper() {
  const promptAnswers = await dataExportPrompt();

  const { map, action } = promptAnswers;
  if (!map || !action) {
    console.error("map or action not specified");
    return;
  }

  const generators = getMapGenerators(map);
  if (!generators) {
    console.error("couldn't set map generators");
    return;
  }

  const [getMapData, getTriggerType] = generators;

  await exportMapData(map, action, getMapData, getTriggerType);
}

async function exportMapData(
  map: string,
  action: ActionKeys,
  getMapData: MapDataGenerator,
  getTriggerType: TriggerTypeGenerator,
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

  const mapId = maps.find((databaseMap) => databaseMap.name === map)?.id;

  if (!mapId) {
    console.error(`map ${map} was not found in local database`);
    return;
  }

  // maps data
  const mapData = await getMapData();

  /* export */
  if (action === ActionKeys.GENERATE_TRIGGERS) {
    exportTriggers(mapData, map, mapId, getTriggerType);
  }

  if (action === ActionKeys.GENERATE_TRICKS) {
    exportTricks(mapData, map, mapId);
  }

  if (action === ActionKeys.GENERATE_TRICK_PATH) {
    exportTrickPathTriggers(mapData, currentDatabaseData, map, mapId);
  }

  if (action === ActionKeys.GENERATE_TELEPORTS) {
    exportTeleports(mapData, currentDatabaseData, map, mapId);
  }
}

function exportTriggers(
  mapData: IMapData,
  localMapName: string,
  localMapId: number,
  getTriggerType: TriggerTypeGenerator,
) {
  const outputTriggers = getMappedTriggers(mapData.triggers, localMapId, getTriggerType);

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

function exportTeleports(
  mapData: IMapData,
  currentDatabaseData: CurrentDatabaseData,
  localMapName: string,
  localMapId: number,
) {
  const outputTeleports = getMappedTeleports(mapData, currentDatabaseData, localMapId);

  const { teleports: inputTeleports } = mapData;
  const date = new Date();
  exportMappedTeleports(date, inputTeleports, outputTeleports, localMapName, localMapId);
}
