import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { HashService } from '../utils/hash.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, HashService, JwtStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
