import { Module } from "@nestjs/common";
import { PrismaModule } from "modules";

import { TricksController } from "./tricks.controller";
import { TricksService } from "./tricks.service";

@Module({
  imports: [PrismaModule],
  controllers: [TricksController],
  providers: [TricksService],
  exports: [],
})
export class TricksModule {}
