import { HTTP } from "../consts";

export class ConflictException extends Error {
  status: number;

  constructor(message: string) {
    super();
    this.name = "RESOURCE_CONFLICT";
    this.message = message;
    this.status = HTTP.CONFLICT;
  }
}
