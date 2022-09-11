import { RmqModule } from "@common/rmq";
import { Module } from "@nestjs/common";
import { TricksModule } from "modules";

@Module({
  imports: [TricksModule, RmqModule.register(process.env.RABBITMQ_URL || "")],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
