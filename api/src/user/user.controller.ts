import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDTO } from './dtos/user.dto';
import { UserRegisterDTO } from './dtos/register.dto';
import { JwtAuthGuard } from 'src/core/gards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  logger = new Logger(UserController.name);

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: any) {
    return { msg: req.user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiResponse({
    status: 200,
    isArray: true,
    type: UserDTO,
    description: 'List of the users',
  })
  async all() {
    return await this.userService.fetchAll();
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() body: UserRegisterDTO) {
    console.log(body);
  }
}
