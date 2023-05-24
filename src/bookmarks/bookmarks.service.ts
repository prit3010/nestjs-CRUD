import { Injectable } from '@nestjs/common';
import { createBookmarkDTO, editBookmarkDTO } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class BookmarksService {
    constructor(private prismaService: PrismaService) {}

    async getBookmarks(userId: number) {
        const my_id = userId;
        return this.prismaService.bookmark.findMany({
            where: {
                userID: my_id,
            }
        })
    }

    getBookmarkbyId(userId: number, bookmarkId:number) {
        return this.prismaService.bookmark.findFirst({
            where:{
                userID: userId,
                id : bookmarkId
            }
        })
    }

    async createBookmark(userId: number,  createDto: createBookmarkDTO ) {
        const my_id = userId
        const adding_bookmark = await this.prismaService.bookmark.create({
            data: {
                userID: my_id,
                ...createDto
            }
        });
        return adding_bookmark
    }

    async editBookmarkbyId(userId: number, bookmarkId: number, dto: editBookmarkDTO) {
        const bookmark =
      await this.prismaService.bookmark.findUnique({
        where: {
          id: bookmarkId,
        },
      });

    // check if user owns the bookmark
    if (!bookmark || bookmark.userID !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prismaService.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    });
    }
    
    async deleteBookmarkbyId(userId: number, bookmarkId:number) {
          const bookmark =
      await this.prismaService.bookmark.findUnique({
        where: {
          id: bookmarkId,
        },
      });

    // check if user owns the bookmark
    if (!bookmark || bookmark.userID !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prismaService.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
    }
