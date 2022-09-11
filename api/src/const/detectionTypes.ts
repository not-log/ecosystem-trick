export enum DetectionTypeKeys {
  COLLIDER = "collider",
  PLATFORM = "platform",
  RAMP = "ramp",
  LADDER = "ladder",
}

export const DetectionTypeCodes: Record<DetectionTypeKeys, number> = {
  [DetectionTypeKeys.COLLIDER]: 0,
  [DetectionTypeKeys.PLATFORM]: 1,
  [DetectionTypeKeys.RAMP]: 2,
  [DetectionTypeKeys.LADDER]: 3,
};
