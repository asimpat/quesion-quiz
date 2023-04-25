import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/module/quiz/dtos/user.dto';
import { User } from 'src/module/quiz/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService:MailerService){}

    async sendUserConfirmation() {
        // const url = `http://localhost:8000/user/register?token=${token}`;
    
        await this.mailerService.sendMail({
          to: 'asimokon10@mailinator.com',
          from:'asimokon09@mailinator.com',
          // from: '"Support Team" <support@example.com>', // override default from
          subject: 'Welcome to Nice App! Confirm your Email',
          template: 'confirmation', // `.hbs` extension is appended automatically
        //   context: { // ✏️ filling curly brackets with content
        //     name: user.name,
        //     url
        //   },
        });
      }
}
