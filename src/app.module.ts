import { Module } from '@nestjs/common';
import { QuizModule } from './module/quiz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/typeOrm.config';
import { QuestionModule } from './module/question.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OptionModule } from './module/option.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';


@Module({
  imports: [   ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRoot({
      transport:{
        host:"smtp.gmail.com",
        port: 465,
        auth:{
          user:"okonasim9@gmail.com",
          pass:"dlftkuhtstztcnin"
        }
      }
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => typeOrmConfig,
    }),  
    QuizModule,
    QuestionModule,
    OptionModule,
    UserModule,
    AuthModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
