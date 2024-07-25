import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUserId = createParamDecorator((data: undefined, ctx: ExecutionContext) => {
  const req: Express.Request = ctx.switchToHttp().getRequest();

  return req.user["sub"];
});
