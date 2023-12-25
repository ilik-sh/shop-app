import { BadRequestException } from "@nestjs/common";
import { ErrorCodes } from "enums/errorCode.enum";

export class ApiRequestException extends BadRequestException {
    constructor(message: ErrorCodes, errors: object) {
      super({ message, errors });
    }
  }