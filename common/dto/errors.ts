export interface ResponseErrorDTO<T = string> {
  status: number;
  error: T;
}
