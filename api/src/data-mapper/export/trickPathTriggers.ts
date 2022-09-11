import { IInputTrickPathTrigger, OutputTrickPathTrigger } from "../types";
import { mapPrismaTrickPathTriggersToInsertValues } from "./../transform";
import { exportToFile, getExportFileName, getFileHeader } from "./common";

export const exportMappedTrickPathTriggers = (
  exportDate: Date,
  inputTrickPathTriggers: IInputTrickPathTrigger[],
  outputTrickPathTriggers: OutputTrickPathTrigger[],
  localMapName: string,
  localMapId: number,
) => {
  const fileHeader = getFileHeader(
    exportDate,
    "trick path triggers",
    localMapName,
    localMapId,
    inputTrickPathTriggers.length,
    outputTrickPathTriggers.length,
  );

  const fileName = getExportFileName(exportDate, localMapName, "path", "sql");
  const fileContent =
    fileHeader +
    "INSERT INTO trick_path (trick_id, trigger_id, trigger_order, type) VALUES\n" +
    mapPrismaTrickPathTriggersToInsertValues(outputTrickPathTriggers).join("\n");

  exportToFile(fileName, fileContent);
};
