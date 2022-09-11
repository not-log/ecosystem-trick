import fs from "fs/promises";
import path from "path";

import { exportFileDirectory } from "../const";

export const getExportFileName = (date: Date, map: string, description: string, extension?: string) => {
  const ext = extension ?? "txt";
  return `${map}_${description}_${date.getTime()}.${ext}`;
};

export const exportToFile = async (fileName: string, content: string) => {
  try {
    await fs.stat(exportFileDirectory);
  } catch {
    await fs.mkdir(exportFileDirectory);
  }

  const completePath = path.resolve(exportFileDirectory, fileName);
  await fs.writeFile(completePath, content);
};

export const getFileHeader = (
  date: Date,
  dataType: string,
  map: string,
  mapId: number,
  inputObjectsCount: number,
  outputObjectsCount: number,
): string => {
  const fileHeader = [
    `/**`,
    ` * Export mapped ${dataType}`,
    ` * Export date: ${date.toLocaleString()}`,
    ` * Map: ${map} (${mapId})`,
    ` * Exported ${outputObjectsCount} / ${inputObjectsCount}`,
    ` */\n\n`,
  ].join("\n");

  return fileHeader;
};
