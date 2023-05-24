import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    async editUser(userId: number, data: EditUserDto) {
        const user = await this.prismaService.user.update({
            where: {
                id: userId,
            },
            data: {
                ...data,
            },
        });
        delete user.hash;
        return user;
        }

    }
