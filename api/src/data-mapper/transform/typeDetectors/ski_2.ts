import { DetectionTypeCodes } from "const";

const detectionTypeColliders = ["through", "over", "behind", "under", "teleporter", "hole"];
const detectionTypePlatforms = [
  "tip",
  "platform",
  "top",
  "sign",
  "block",
  "box",
  "ledge",
  "wall",
  "plus", // healbot plus
];
const detectionTypeRamps = ["ramp", "rampz", "wing"];
const detectionTypeLadders = ["ladder"];

export const getSki2TriggerDetectionType = (name: string): number => {
  const nameParts = name.split(" ").map((part) => part.toLowerCase());

  for (const part of nameParts) {
    if (detectionTypeColliders.includes(part)) return DetectionTypeCodes.collider;
    if (detectionTypePlatforms.includes(part)) return DetectionTypeCodes.platform;
    if (detectionTypeRamps.includes(part)) return DetectionTypeCodes.ramp;
    if (detectionTypeLadders.includes(part)) return DetectionTypeCodes.ladder;
  }

  return -1;
};
