import { isResponseErrorObject } from "@common/dto";
import { Body, HttpException, InternalServerErrorException, Patch, UseGuards } from "@nestjs/common";
import { Controller, Post } from "@nestjs/common";
import { HostGuard } from "guards/host.guard";

import { ApiService } from "./api.service";

@Controller("api")
@UseGuards(HostGuard)
export class ApiController {
  constructor(private apiService: ApiService) {}

  @Post("tricks")
  async createTrick(@Body() trick: unknown) {
    try {
      return await this.apiService.createTrick(trick);
    } catch (err: unknown) {
      if (isResponseErrorObject(err)) {
        throw new HttpException(err, err.status);
      } else {
        throw new InternalServerErrorException(err);
      }
    }
  }

  @Patch("tricks")
  async updateTrick(@Body() trick: unknown) {
    try {
      return await this.apiService.updateTrick(trick);
    } catch (err: unknown) {
      if (isResponseErrorObject(err)) {
        throw new HttpException(err, err.status);
      } else {
        throw new InternalServerErrorException(err);
      }
    }
  }
}
