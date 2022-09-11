import { Module } from "@nestjs/common";
import { ApiModule } from "modules/api/api.module";

@Module({
  imports: [ApiModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
