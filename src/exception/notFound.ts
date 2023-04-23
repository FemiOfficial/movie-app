import { HTTP } from "../consts";

export class NotFoundException extends Error {
  status: number;

  constructor(message: string) {
    super();
    this.name = "RESOURCE_NOT_FOUND";
    this.message = message;
    this.status = HTTP.NOT_FOUND;
  }
}
