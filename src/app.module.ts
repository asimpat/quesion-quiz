import { Module } from '@nestjs/common';
import { QuizModule } from './module/quiz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { Quiz } from './module/quiz/entities/quiz.entity';
import { Question } from './module/quiz/entities/question.entity';
import { QuestionModule } from '../dist/module/question.module';
import { typeOrmConfig } from './config/typeOrm.config';

@Module({
  imports: [   ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => typeOrmConfig,
    }),  
    QuizModule,
    QuestionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
