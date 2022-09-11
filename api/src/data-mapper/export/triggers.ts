import { mapPrismaTriggersToInsertValues } from "../transform";
import { IInputTrigger, OutputTrigger } from "../types";
import { exportToFile, getExportFileName, getFileHeader } from "./common";

export const exportMappedTriggers = (
  exportDate: Date,
  inputTriggers: IInputTrigger[],
  outputTriggers: OutputTrigger[],
  localMapName: string,
  localMapId: number,
) => {
  const fileHeader = getFileHeader(
    exportDate,
    "triggers",
    localMapName,
    localMapId,
    inputTriggers.length,
    outputTriggers.length,
  );

  const fileName = getExportFileName(exportDate, localMapName, "triggers", "sql");
  const fileContent =
    fileHeader +
    "INSERT INTO ref_triggers (map_id, name, global_passthrough, detection_type) VALUES\n" +
    mapPrismaTriggersToInsertValues(outputTriggers).join("\n");

  exportToFile(fileName, fileContent);
};
