import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashService } from 'src/utils/hash.service';
import { UserRegisterDTO } from './dtos/register.dto';
import { UserErrorMessages } from './error_messages';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashService: HashService,
  ) {}

  logger = new Logger(UserService.name);

  async register({ email, password }: UserRegisterDTO) {
    try {
      const password_hash = await this.hashService.hash(password);
      const user = await this.prismaService.user.create({
        data: { email, password_hash },
      });
      return user;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new BadRequestException(UserErrorMessages.AlreadyExist);
      }
      throw new InternalServerErrorException(UserErrorMessages.InternalError);
    }
  }

  async fetchAll() {
    try {
      return await this.prismaService.user.findMany({
        select: { email: true, id: true },
      });
    } catch (e) {
      throw new InternalServerErrorException(UserErrorMessages.InternalError);
    }
  }

  async findById(id: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: { id },
        select: { password_hash: false },
      });
    } catch (e) {
      this.logger.error('findById', e.message);
      throw new InternalServerErrorException(UserErrorMessages.InternalError);
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: { email },
      });
    } catch (e) {
      this.logger.error('findById', e.message);
      throw new InternalServerErrorException(UserErrorMessages.InternalError);
    }
  }

  async initAdmin() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    try {
      this.logger.log('creating admin user...');
      await this.register({ email, password });
      this.logger.log('Admin user created');
    } catch (e) {
      if (e.message === UserErrorMessages.AlreadyExist) {
        this.logger.warn('Admin user Already created');
      } else {
        this.logger.error(e.message);
      }
    }
  }
}
