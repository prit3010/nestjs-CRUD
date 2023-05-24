import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Used Global Decorator to make PrismaService available to all modules
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
