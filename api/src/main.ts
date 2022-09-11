import { config } from "dotenv";
import path from "path";

config({
  path: path.resolve(process.cwd(), "../", "@env_files", ".api.env"),
});

import { API_SERVICE } from "@common/rmq";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { AppModule } from "./app.module";

const logger = new Logger("Api module");

const rabbitmqUrl = process.env.RABBITMQ_URL || "";
const mode = process.env.NODE_ENV || "development";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [rabbitmqUrl],
      queue: API_SERVICE.queue,
    },
  });
  await app.listen();
  logger.log(`Running in ${mode} mode`);
}
bootstrap();
