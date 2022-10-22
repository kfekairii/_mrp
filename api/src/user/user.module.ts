import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HashService } from 'src/utils/hash.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [HashService, UserService],
  controllers: [UserController],
  imports: [PrismaModule],
  exports: [UserService],
})
export class UserModule {}
