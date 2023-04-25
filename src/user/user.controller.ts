import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/module/quiz/dtos/user.dto';
import { User } from 'src/module/quiz/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/module/quiz/dtos/login.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MailService } from 'src/mail/mail.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
    private mailService: MailService,
  ) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  async registerUser(@Body() user: UserDto): Promise<User | Object> {
    return await this.userService.registerUser(user);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('login')
  loginUser(@Body() user: LoginDto): any {
    return this.authService.loginUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  async getUser(@Request() req) {
    return await this.userService.userProfile(req.user.email);
  }

  @Get('email')
  async sendMail() {
    return await this.userService.sendMail();
  }

  @Get('email/send')
  async sendEmail() {
    return await this.mailService.sendUserConfirmation();
  }

  @Get('password/forgot')
  async forgetPassword(@Body() email) {
    return await this.authService.forgetPassword(email);
  }

  @Post('password/reset')
  async resetPassword(@Body() pass) {
    return await this.authService.resetPassword(pass);
  }
}
