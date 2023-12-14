import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserSessionDto } from "domain/dtos/userSession.dto";

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest();
      return request as UserSessionDto;
    },
  );