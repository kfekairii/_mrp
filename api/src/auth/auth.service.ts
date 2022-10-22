import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { HashService } from '../utils/hash.service';
import { LoginDTO } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    const isValidePassword = await this.hashService.compare(
      password,
      user.password_hash,
    );

    if (user && isValidePassword) {
      delete user.password_hash;
      return user;
    }
    return null;
  }

  async login(user: LoginDTO) {
    const current_user = await this.validateUser(user.email, user.password);
    if (!current_user) {
      throw new UnauthorizedException('auth/invalid_credentials');
    }
    const payload = { sub: current_user.id, email: current_user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
