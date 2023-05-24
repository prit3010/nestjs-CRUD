import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDTO } from './dto';
import { Prisma } from '@prisma/client';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService{
    constructor(private prismaService: PrismaService, private jwt: JwtService, private config: ConfigService) {}
    async signin(dto: AuthDTO){
        const user = await this.prismaService.user.findFirst({
            where: {
                email: dto.email,
            },
        });
        if(!user){
            throw new ForbiddenException('Wrong email or password');
        };
        const isPasswordValid = await argon.verify(user.hash, dto.password);
        if(!isPasswordValid){
            throw new ForbiddenException('Wrong email or password');
        }
        return this.signToken(user.id, user.email);
    }
    async signup(dto: AuthDTO){
    try{
        const hash = await argon.hash(dto.password)
        const user = await this.prismaService.user.create({
            data: {
                email: dto.email,
                hash: hash,
            },
        });
        return this.signToken(user.id, user.email);
    } catch (error) {
        
        if (error instanceof Prisma.PrismaClientKnownRequestError){
            //Error Code for Unique Constraint(aka Duplicate Key)
            if (error.code === 'P2002'){
                throw new ForbiddenException('Email already exists');
            }  
        }
        throw error;
    }
}

async signToken(userID:number, email:string): Promise<{ access_token: string }>{
    const payload = {sub:userID, email};
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: secret,
    });
    return {
      access_token: token,
    };
}
}