export interface ServiceOptions {
  name: string;
  queue: string;
}

export const API_SERVICE: ServiceOptions = {
  name: "API_SERVICE",
  queue: "api_queue",
};

export const services = [API_SERVICE];
