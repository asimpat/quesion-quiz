import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/module/quiz/dtos/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { User } from 'src/module/quiz/entities/user.entity';
import { Password } from 'src/module/quiz/entities/password.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { UserDto } from 'src/module/quiz/dtos/user.dto';
import { ResetPasswordDto } from 'src/module/quiz/dtos/reset.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UserService,
    @InjectRepository(Password)
    private readonly passwordService: Repository<Password>,
    private mailerService: MailerService,
  ) {}

  async validateUser(email, password): Promise<User> {
    const getUser = await this.userService.getUserByEmail(email);
    if (!getUser) throw new UnauthorizedException('Credential Incorrect');
    if (!(await bcrypt.compare(password, getUser.password))) {
      throw new UnauthorizedException('Credential Incorrect');
    }
    return getUser;
  }

  async loginUser(user: LoginDto) {
    const userEmail = await this.validateUser(user.email, user.password);
    const payload = {
      sub: userEmail.id,
      email: userEmail.email,
      name: userEmail.name,
    };
    const result = this.jwtService.sign(payload, {
      secret: process.env.DB_SECRET,
    });
    return {
      access_token: result,
      msg: 'Sucessfully Logged in',
    };
  }

  async forgetPassword(user: UserDto) {
    const isEmail = await this.userService.getUserByEmail(user.email);

    if (!isEmail) throw new UnauthorizedException('USER NOT FOUND');

    const token = Math.random().toString(30).substring(2, 30);

    await this.passwordService.save({
      email: user.email,
      token: token,
    });

    const url = `http://localhost:3000/reset/${token}`;
    await this.mailerService.sendMail({
      to: 'asimokon10@mailinator.com',
      from: 'asimokon09@mailinator.com',
      subject: 'RESET PASSWORD',
      text: 'Reset Password',
      html: `<b>Click <a href="${url}">Here</a> to reset your password<b>`,
    });
    return 'Please check email to reset password';
  }

  async resetPassword(pass:ResetPasswordDto) {
    if (pass.password != pass.confirmPassword) {
      return { message: `PASSWORD DO NO MATCH` };
    }

    const passwordReset = await this.passwordService.findOne({
      where: { token: pass.token },
    });

    const user = await this.userService.getUserByEmail(passwordReset.email);

    if (!user) {
      throw new UnauthorizedException(`USER NOT FOUND`);
    }
    const hash = await bcrypt.hash(pass.password, 12);

    await this.userService.update(user.id, {hash});

    return {
      message: `Password Reset Succesuful `,
    };
  }
}
