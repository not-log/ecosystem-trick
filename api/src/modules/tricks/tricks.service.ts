import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { TrickPathTrigger } from "@prisma/client";
import { PrismaService } from "modules/prisma";
import { SafeOmit } from "utils/types";

import { PatchTrickDTO, PostTrickDTO, TrickDTO } from "./types";

@Injectable()
export class TricksService {
  constructor(private prismaService: PrismaService) {}

  async createTrick(createTrick: PostTrickDTO): Promise<TrickDTO> {
    const { trickPath, userSteamId, ...trickDto } = createTrick;

    const user = userSteamId ? await this.findOrCreateUserBySteamId(userSteamId) : null;

    const authorName = user ? user.name : createTrick.authorName;

    return await this.prismaService.$transaction(async (prisma): Promise<TrickDTO> => {
      const trick = await prisma.trick
        .create({
          data: {
            ...trickDto,
            createdAt: Math.floor(Date.now() / 1000),
            authorId: user?.id || null,
            authorName,
          },
        })
        .catch(() => {
          throw new InternalServerErrorException("Failed to create trick");
        });

      const trickPathTriggersData = trickPath.map(
        (path): SafeOmit<TrickPathTrigger, "id"> => ({
          ...path,
          trickId: trick.id,
        }),
      );

      await prisma.trickPathTrigger
        .createMany({
          data: [...trickPathTriggersData],
        })
        .catch(() => {
          throw new InternalServerErrorException("Failed to create trick path");
        });

      return {
        ...trick,
        trickPath: trickPathTriggersData,
      };
    });
  }

  async updateTrick(updateTrick: PatchTrickDTO): Promise<TrickDTO> {
    const { trickPath, userSteamId, ...trickDto } = updateTrick;
    const trickId = trickDto.id;

    const user = await this.findOrCreateUserBySteamId(userSteamId);

    return await this.prismaService.$transaction(async (prisma): Promise<TrickDTO> => {
      await prisma.trickPathTrigger.deleteMany({
        where: {
          trickId,
        },
      });

      const updatedTrick = await prisma.trick
        .update({
          data: {
            ...trickDto,
            updatedAt: Math.floor(Date.now() / 1000),
            updateAuthorId: user.id,
          },
          where: {
            id: trickId,
          },
        })
        .catch(() => {
          throw new InternalServerErrorException("Failed to update trick");
        });

      const trickPathTriggersData = trickPath.map(
        (path): SafeOmit<TrickPathTrigger, "id"> => ({
          ...path,
          trickId,
        }),
      );

      await prisma.trickPathTrigger
        .createMany({
          data: [...trickPathTriggersData],
        })
        .catch(() => {
          throw new InternalServerErrorException("Failed to create trick path");
        });

      return {
        ...updatedTrick,
        trickPath: trickPathTriggersData,
      };
    });
  }

  private async findOrCreateUserBySteamId(steamId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { steamId },
    });

    if (user) {
      return user;
    }

    return await this.prismaService.user.create({
      data: {
        steamId,
        // можно подтянуть со стима
        name: "<Auto generated user>",
      },
    });
  }
}
