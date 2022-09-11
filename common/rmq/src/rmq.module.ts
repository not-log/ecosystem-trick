import { DynamicModule, Logger, Module } from "@nestjs/common";
import { ClientProviderOptions, ClientsModule, Transport } from "@nestjs/microservices";

import { services } from "./services";

const logger = new Logger("Rmq Module");

@Module({
  providers: [],
  exports: [],
})
export class RmqModule {
  static register(url: string): DynamicModule {
    logger.log("Registered clients module");

    return {
      module: RmqModule,
      imports: [
        ClientsModule.register(
          services.map((service): ClientProviderOptions => {
            return {
              transport: Transport.RMQ,
              name: service.name,
              options: {
                queue: service.queue,
                urls: [url],
                persistent: true,
              },
            };
          }),
        ),
      ],
      exports: [ClientsModule],
    };
  }
}
