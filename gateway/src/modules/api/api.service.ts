import { API_SERVICE } from "@common/rmq";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class ApiService {
  constructor(@Inject(API_SERVICE.name) private apiClient: ClientProxy) {}

  async createTrick(trick: unknown) {
    const stream$ = this.apiClient.send<unknown>("create_trick", trick);
    return await lastValueFrom(stream$);
  }

  async updateTrick(trick: unknown) {
    const stream$ = this.apiClient.send<unknown>("update_trick", trick);
    return await lastValueFrom(stream$);
  }
}
