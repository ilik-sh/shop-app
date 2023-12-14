import { ErrorCodes } from "enums/errorCode.enum";
import { InternalServerErrorException } from "@nestjs/common";

export class ApiInternalException extends InternalServerErrorException {
    constructor(errorCode: ErrorCodes) {
      super({ errorCode });
    }
  }