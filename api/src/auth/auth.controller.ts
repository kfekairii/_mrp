import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() user: LoginDTO,
  ) {
    const result = await this.authService.login(user);
    res.cookie('access_token', result.access_token, { httpOnly: true });
    return result;
  }
}
