import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/module/quiz/dtos/user.dto';
import { User } from 'src/module/quiz/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailerService: MailerService,
  ) {}

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async hashPassword(password: string) {
    const hashPassword = await bcrypt.hash(password, 12);
    return hashPassword;
  }

  async registerUser(user: UserDto): Promise<User | Object> {
    const userEmail = await this.getUserByEmail(user.email);
    if (user.password != user.confirmPassword) {
      return { message: `password does not match, confirm Password` };
    }

    if (!userEmail) {
      const createUser = await this.userRepository.create(user);
      createUser.password = await this.hashPassword(user.password);
      const newUser = await this.userRepository.save(createUser);
      delete newUser.password;
      return newUser;
    } else {
      throw new UnauthorizedException(`User already Exist`);
    }
  }

  async sendMail() {
    await this.mailerService.sendMail({
      to: 'asimokon10@mailinator.com',
      from: 'asimokon09@mailinator.com',
      subject: 'simple text',
      text: 'welcome to nest js',
      html: '<b>WELCOME TO EMAIL SENDING NESTJS<b>',
    });
    return 'email sent';
  }

  async update(id:number, data:any){
    return await this.userRepository.update(id, data)
  }

  // get user profile
  async userProfile(email) {
    let user = await this.getUserByEmail(email);
    delete user.password;

    return user;
  }
}
