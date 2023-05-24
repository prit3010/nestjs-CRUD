import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from '../../prisma/prisma.service'


// Purpose of this: Is to extract the JWT from the request and verify it. THis can by endpoints to verify if the person can be logged in.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(configService: ConfigService, private prisma:PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET'),
        });
}
async validate(payload:{sub:number, email:string}) {
    const user = await this.prisma.user.findUnique({
        where: {
            id: payload.sub,
        },
    });
    delete user.hash;
    return user;
}
}