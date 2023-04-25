import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/module/quiz/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { Password } from 'src/module/quiz/entities/password.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User, Password]), AuthModule, MailModule],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService],
  exports:[AuthService]
})
export class UserModule {}
