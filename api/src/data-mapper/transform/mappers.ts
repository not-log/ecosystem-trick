import { isDefined } from "utils";

import {
  CurrentDatabaseData,
  IInputTrick,
  IInputTrickPathTrigger,
  IInputTrigger,
  IMapData,
  IModifiedInputTrickPathTrigger,
  OutputTrick,
  OutputTrickPathTrigger,
  OutputTrigger,
  TriggerTypeGenerator,
} from "../types";
import { IInputMapTeleport } from "./../types/input-types";
import { OutputTeleport } from "./../types/output-types";
import { filterTricksWithZSkyworldAuthor } from "./filters";
import { normalizeTrickPathTriggersOrder } from "./transformers";
import { joinInsertValues, numbersToString } from "./utils";

export const getMappedTriggers = (
  triggers: IInputTrigger[],
  localMapId: number,
  getTriggerType: TriggerTypeGenerator,
): OutputTrigger[] => {
  return triggers.map(mapInputTriggerToPrismaTrigger(localMapId, getTriggerType)).filter(isDefined);
};

export const getMappedTricks = (tricks: IInputTrick[], localMapId: number): OutputTrick[] => {
  return tricks.map(mapInputTrickToPrismaTrick(localMapId)).filter(isDefined).filter(filterTricksWithZSkyworldAuthor);
};

export const getMappedTrickPathTriggers = (
  mapData: IMapData,
  currentDatabaseData: CurrentDatabaseData,
  localMapId: number,
): OutputTrickPathTrigger[] => {
  const { triggers: inputTriggers, tricks } = mapData;
  const { triggers: localTriggers, tricks: localTricks } = currentDatabaseData;

  const modifiedTrickPathTriggers = tricks
    // TODO передавать уже отфильтрованные трюки?
    .filter(filterTricksWithZSkyworldAuthor)
    .flatMap((trick): IModifiedInputTrickPathTrigger[] | null => {
      const normalizedTrickSequence = normalizeTrickPathTriggersOrder(trick.trick_sequence);

      const localTrickId = localTricks.find(
        (localTrick) => localTrick.name === trick.name && localTrick.mapId === localMapId,
      )?.id;

      if (!localTrickId) return null;

      return normalizedTrickSequence.map(mapInputTrickPathTriggerToModifiedInputTrickPathTrigger(localTrickId));
    })
    .filter(isDefined);

  return modifiedTrickPathTriggers
    .map((trigger) => {
      const { trigger_id: inputTriggerId } = trigger;
      const inputTriggerName = inputTriggers.find((inputTrigger) => inputTrigger.id === inputTriggerId)?.name;
      const localTriggerId = localTriggers.find((localTrigger) => localTrigger.name === inputTriggerName)?.id;

      if (!localTriggerId) return null;

      return mapModifiedInputTrickPathTriggerToPrismaTrickPathTrigger(localTriggerId)(trigger);
    })
    .filter(isDefined);
};

export const getMappedTeleports = (
  mapData: IMapData,
  currentDatabaseData: CurrentDatabaseData,
  localMapId: number,
): OutputTeleport[] => {
  const { triggers: inputTriggers, teleports } = mapData;
  const { triggers: localTriggers } = currentDatabaseData;

  return teleports
    .map((teleport): OutputTeleport | null => {
      const { trigger_id: inputTriggerId } = teleport;

      const inputTrigger = inputTriggers.find((trigger) => trigger.id === inputTriggerId);
      const localTrigger = localTriggers
        .filter((trigger) => trigger.mapId === localMapId)
        .find((trigger) => trigger.name === inputTrigger?.name);

      // при inputTriggerId == null триггер является вхопом
      if (!inputTrigger && inputTriggerId !== null) return null;

      return mapInputTeleportToPrismaTeleport(localMapId, localTrigger?.id || null)(teleport);
    })
    .filter(isDefined);
};

export const mapInputTriggerToPrismaTrigger = (
  localMapId: number,
  getTriggerType: TriggerTypeGenerator,
): ((input: IInputTrigger) => OutputTrigger | null) => {
  return (input: IInputTrigger): OutputTrigger | null => {
    return {
      mapId: localMapId,
      name: input.name,
      globalPassthrough: Boolean(input.passthrough),
      detectionType: getTriggerType(input.name),
    };
  };
};

export const mapInputTrickToPrismaTrick = (localMapId: number): ((input: IInputTrick) => OutputTrick | null) => {
  return (input: IInputTrick): OutputTrick | null => {
    return {
      // common
      mapId: localMapId,
      authorName: input.author,
      createdAt: Math.floor(Date.now() / 1000),
      name: input.name,

      // anticheats
      maxJumps: input.max_jumps,
      noJumpStart: Boolean(input.no_jump),
      loopCount: 2,
      prespeedable: input.max_prestrafe === null,
      // нельзя получить более точное значение
      repetitionTrigger: 1,

      // unused
      authorId: null,
      updatedAt: null,
      updateAuthorId: null,
    };
  };
};

export const mapInputTrickPathTriggerToModifiedInputTrickPathTrigger = (
  trickId: number,
): ((trickPathTrigger: IInputTrickPathTrigger) => IModifiedInputTrickPathTrigger) => {
  return (trickPathTrigger) => ({
    ...trickPathTrigger,
    trickId,
  });
};

export const mapModifiedInputTrickPathTriggerToPrismaTrickPathTrigger = (
  localTriggerId: number,
): ((input: IModifiedInputTrickPathTrigger) => OutputTrickPathTrigger | null) => {
  return (input): OutputTrickPathTrigger | null => {
    const type = input.passthrough ? 1 : 0;

    return {
      // нужно смапить на новый IInputTrickPathTrigger с последовательной очередностью
      // order для пасс триггеров в IInputTrickPathTrigger означает что триггер может быть задет вместо обычного триггера с этим order
      // нужно изменить order на order - 1, так как у нас обрабатываются pass/cancel триггеры в середине между двумя обычными
      trickId: input.trickId,
      triggerId: localTriggerId,
      triggerOrder: input.order,
      type,
    };
  };
};

export const mapInputTeleportToPrismaTeleport = (
  localMapId: number,
  localTriggerId: number | null,
): ((input: IInputMapTeleport) => OutputTeleport) => {
  return (input): OutputTeleport => {
    return {
      mapId: localMapId,
      triggerId: localTriggerId,
      name: input.name,
      origin: numbersToString([input.origin_x, input.origin_y, input.angles_z]),
      angles: numbersToString([input.angles_x, input.angles_y, input.angles_z]),
      velocity: numbersToString([input.velocity_x, input.velocity_y, input.velocity_z]),
    };
  };
};

export const mapPrismaTriggersToInsertValues = (triggers: OutputTrigger[]): string[] => {
  return triggers.map((trigger) => {
    return `(${joinInsertValues(
      trigger.mapId,
      trigger.name,
      Number(trigger.globalPassthrough),
      trigger.detectionType ?? -1,
    )})`;
  });
};

export const mapPrismaTricksToInsertValues = (tricks: OutputTrick[]): string[] => {
  return tricks.map((trick) => {
    // map_id, created_at, name, author, max_jumps, no_jump_start, prespeedable, repetition_trigger, loop_count
    return `(${joinInsertValues(
      trick.mapId,
      trick.createdAt,
      trick.name,
      trick.authorName,
      trick.maxJumps ?? -1,
      Number(trick.noJumpStart),
      Number(trick.prespeedable),
      Number(trick.repetitionTrigger),
      trick.loopCount,
    )})`;
  });
};

export const mapPrismaTrickPathTriggersToInsertValues = (trickPathTriggers: OutputTrickPathTrigger[]): string[] => {
  return trickPathTriggers.map((trickTrigger) => {
    // trick_id, trigger_id, trigger_order, type
    return `(${joinInsertValues(
      trickTrigger.trickId,
      trickTrigger.triggerId,
      trickTrigger.triggerOrder,
      trickTrigger.type,
    )})`;
  });
};

export const mapPrismaTeleportToInsertValues = (teleports: OutputTeleport[]): string[] => {
  return teleports.map((teleport) => {
    // map_id, trigger_id, name, origin, angles, velocity
    return `(${joinInsertValues(
      teleport.mapId,
      teleport.triggerId,
      teleport.name,
      teleport.origin,
      teleport.angles,
      teleport.velocity,
    )})`;
  });
};
