interface IUnusedProperties {
  [key: string]: unknown;
}

export interface IInputMap extends IUnusedProperties {
  id: number;
  author: string;
  name: string;
}

export interface IInputMapTeleport extends IUnusedProperties {
  id: number;
  map_id: number;
  // null для вхопа
  trigger_id: number | null;
  name: string;
  active: boolean | number;
  angles_x: number;
  angles_y: number;
  angles_z: number;
  origin_x: number;
  origin_y: number;
  origin_z: number;
  velocity_x: number | null;
  velocity_y: number | null;
  velocity_z: number | null;
}

export interface IInputTrigger extends IUnusedProperties {
  id: number;
  map_id: number;
  name: string;
  passthrough: boolean | number;
  image_url: string;
  trick_count: number;
}

export interface IInputTrickPathTrigger extends IUnusedProperties {
  trigger_id: number;
  order: number;
  passthrough: boolean | number;
}

export interface IModifiedInputTrickPathTrigger extends IInputTrickPathTrigger {
  trickId: number;
}

export interface IInputTrick extends IUnusedProperties {
  id: number;
  map_id: number;
  active: boolean | number;
  author: string;
  // если null то author = 'zSkyworld.com'
  author_id: number | null;
  completions: number;
  // дата добавления
  date: string;
  last_updated: string | null;
  last_updated_author_id: number | null;

  name: string;
  playersCompleted: number;
  points: number;
  tier: number;

  /* античиты */
  // максимальное время выполнения (не нужен)
  max_duration: number | null;
  // максимальное количество прыжков
  max_jumps: number | null;
  // макс пре -> если != null то тип трюка Max Prestrafe, иначе тип трюка Prespeedable
  max_prestrafe: number | null;
  // ?? не нужен
  min_velocity: number | null;
  // запрещает прыгать на первой платформе
  no_jump: boolean | number;

  trick_sequence: IInputTrickPathTrigger[];
}
