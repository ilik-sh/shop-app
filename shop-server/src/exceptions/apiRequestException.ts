import { BadRequestException } from "@nestjs/common";
import { ErrorCodes } from "enums/errorCode.enum";

export class ApiRequestException extends BadRequestException {
    constructor(errorCode: ErrorCodes, errors: object) {
      super({ errorCode, errors });
    }
  }