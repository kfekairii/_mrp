import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HashService } from './utils/hash.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [PrismaModule, UserModule, AuthModule],
  controllers: [],
  providers: [UserService, HashService],
})
export class AppModule {}
