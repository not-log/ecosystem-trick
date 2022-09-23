import { Teleport, Trick, TrickPathTrigger, Trigger } from "@prisma/client";
import { Simplify, WithOptional } from "utils";

export type OutputTrigger = Simplify<WithOptional<Trigger, "id" | "detectionType">>;

export type OutputTrick = Simplify<WithOptional<Trick, "id">>;

export type OutputTrickPathTrigger = Simplify<WithOptional<TrickPathTrigger, "id">>;

export type OutputTeleport = Simplify<WithOptional<Teleport, "id">>;
