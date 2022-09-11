import { ResponseErrorDTO } from "@common/dto";
import { HttpStatus } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { MessagePattern, Payload, RpcException } from "@nestjs/microservices";

import { TricksService } from "./tricks.service";
import { PatchTrickDTO, PostTrickDTO, TrickDTO } from "./types";

@Controller()
export class TricksController {
  constructor(private tricksService: TricksService) {}

  @MessagePattern("create_trick")
  async createTrick(@Payload() trick: PostTrickDTO): Promise<TrickDTO> {
    try {
      return await this.tricksService.createTrick(trick);
    } catch (err) {
      const isHttpException = err instanceof HttpException;
      const responseError: ResponseErrorDTO = {
        status: isHttpException ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR,
        error: isHttpException ? err.message : "Unhandled server error",
      };

      throw new RpcException(responseError);
    }
  }

  @MessagePattern("update_trick")
  async updateTrick(@Payload() trick: PatchTrickDTO): Promise<TrickDTO> {
    try {
      return await this.tricksService.updateTrick(trick);
    } catch (err) {
      const isHttpException = err instanceof HttpException;
      const responseError: ResponseErrorDTO = {
        status: isHttpException ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR,
        error: isHttpException ? err.message : "Unhandled server error",
      };

      throw new RpcException(responseError);
    }
  }
}
