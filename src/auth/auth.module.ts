import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/module/quiz/entities/user.entity';
import { JwtStrategy } from './strategy/jwt.strategy';
import { MailModule } from 'src/mail/mail.module';
import { Password } from 'src/module/quiz/entities/password.entity';
require("dotenv").config();

@Module({
  imports:[TypeOrmModule.forFeature([User, Password]), PassportModule,
   JwtModule.register({
    secret:process.env.DB_SECRET,
    signOptions:{expiresIn:'1d'}
  }),
  MailModule
],
  providers: [AuthService, UserService, JwtStrategy],
  // exports:[AuthService]
  
})
export class AuthModule {}
 