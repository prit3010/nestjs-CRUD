import { ExecutionContext } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common";

// This decorator will be used to get the user from the request object
export const GetUser = 
// The purpose of putting string | undefined would be to give us the flexibility to either choose which parametes 
// we want from our user object or just get the whole user object
createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (data) {
        return request.user[data];
    }
    return request.user;
});