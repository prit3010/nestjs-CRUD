import { Controller, UseGuards, Get, Post, Patch, Delete } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorators';
import { BookmarksService } from './bookmarks.service';
import { ParseIntPipe } from '@nestjs/common';
import { Body, Param } from '@nestjs/common';
import { createBookmarkDTO, editBookmarkDTO } from './dto';
import { HttpCode } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Controller('bookmarks')
@UseGuards(JwtGuard)
export class BookmarksController {
    constructor (private bookmarkService: BookmarksService) {}
    @Get()
    getBookmarks(@GetUser('id') userId: number) {
        return this.bookmarkService.getBookmarks(userId);
    }

    @Get(':id')
    getBookmarkbyId(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId:number) {
        return this.bookmarkService.getBookmarkbyId(userId, bookmarkId);
    }

    @Post()
    createBookmark(@GetUser('id') userId: number, @Body() dto: createBookmarkDTO ) {
        return this.bookmarkService.createBookmark(userId, dto);
    }

    @Patch(':id')
    editBookmarkbyId(@GetUser('id') userId: number,@Param('id', ParseIntPipe) bookmarkId:number, @Body() dto: editBookmarkDTO) {
        return this.bookmarkService.editBookmarkbyId(userId, bookmarkId, dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBookmarkbyId(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId:number) {
        return this.bookmarkService.deleteBookmarkbyId(userId, bookmarkId);
    }
}
