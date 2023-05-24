import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService)  {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL'),
                },
        }});
    }

    cleanDb() {
        // Purpose of this: Is to delete all the data in the database
        // Use of transaction would be to order the deletion of the data 
        // Ie now the bookmark table is deleted before the user table
        return this.$transaction([
            this.bookmark.deleteMany(),
            this.user.deleteMany(),
        ]);
    }
}
