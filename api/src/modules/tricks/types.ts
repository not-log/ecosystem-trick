import { Trick, TrickPathTrigger } from "@prisma/client";
import { SafeOmit, Simplify } from "utils";

// TODO нужно вынести dto в отдельный пакет

type PostTrickPathTriggerDTO = SafeOmit<TrickPathTrigger, "id" | "trickId">;

type TrickPathDTO = {
  trickPath: PostTrickPathTriggerDTO[];
};

type TrickAuthorSteamID = {
  userSteamId: number;
};

type OmitPostTrickKeys = keyof Pick<Trick, "id" | "createdAt" | "updatedAt" | "authorId" | "updateAuthorId">;

type OmitPutTrickKeys = keyof Pick<Trick, "createdAt" | "updatedAt" | "authorId" | "authorName" | "updateAuthorId">;

export type TrickDTO = Simplify<Trick & TrickPathDTO>;
export type PostTrickDTO = Simplify<SafeOmit<Trick, OmitPostTrickKeys> & TrickPathDTO & Partial<TrickAuthorSteamID>>;
export type PatchTrickDTO = Simplify<SafeOmit<Trick, OmitPutTrickKeys> & TrickPathDTO & TrickAuthorSteamID>;
