import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { GetUser } from '../auth/decorators';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { Patch, Body } from '@nestjs/common';


@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Get("me")
    getMe(@GetUser() user: User){
        return user;
    }

    @Patch()
    editUser(@GetUser('id') id:number, @Body() dto:EditUserDto) {
        return this.userService.editUser(id, dto);  
    }
}
