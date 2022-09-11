import { config } from "dotenv";
import path from "path";

config({
  path: path.resolve(process.cwd(), "../", "@env_files", ".gateway.env"),
});

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

const logger = new Logger("Gateway module");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
  const mode = process.env.NODE_ENV || "development";
  logger.log(`Running in ${mode} mode`);
}
bootstrap();
