import { IInputTrick, OutputTrick } from "../types";
import { mapPrismaTricksToInsertValues } from "./../transform";
import { exportToFile, getExportFileName, getFileHeader } from "./common";

export const exportMappedTricks = (
  exportDate: Date,
  inputTricks: IInputTrick[],
  outputTricks: OutputTrick[],
  localMapName: string,
  localMapId: number,
) => {
  const fileHeader = getFileHeader(
    exportDate,
    "tricks",
    localMapName,
    localMapId,
    inputTricks.length,
    outputTricks.length,
  );

  const fileName = getExportFileName(exportDate, localMapName, "tricks", "sql");
  const fileContent =
    fileHeader +
    "INSERT INTO tricks (map_id, created_at, name, author, max_jumps, no_jump_start, prespeedable, repetition_trigger, loop_count) VALUES\n" +
    mapPrismaTricksToInsertValues(outputTricks).join("\n");

  exportToFile(fileName, fileContent);
};
