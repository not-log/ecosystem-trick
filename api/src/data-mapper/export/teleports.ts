import { OutputTeleport } from "../types";
import { mapPrismaTeleportToInsertValues } from "./../transform";
import { IInputMapTeleport } from "./../types/input-types";
import { exportToFile, getExportFileName, getFileHeader } from "./common";

export const exportMappedTeleports = (
  exportDate: Date,
  inputTeleports: IInputMapTeleport[],
  outputTeleports: OutputTeleport[],
  localMapName: string,
  localMapId: number,
) => {
  const fileHeader = getFileHeader(
    exportDate,
    "teleports",
    localMapName,
    localMapId,
    inputTeleports.length,
    outputTeleports.length,
  );

  const fileName = getExportFileName(exportDate, localMapName, "teleports", "sql");
  const fileContent =
    fileHeader +
    "INSERT INTO teleports (map_id, trigger_id, name, origin, angles, velocity) VALUES\n" +
    mapPrismaTeleportToInsertValues(outputTeleports).join(",\n");

  exportToFile(fileName, fileContent);
};
