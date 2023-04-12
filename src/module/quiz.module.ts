import { Module } from '@nestjs/common';
import { QuizController } from './quiz/controllers/quiz.controller';
import { QuizService } from './quiz/services/quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz/entities/quiz.entity';
import { Question } from './quiz/entities/question.entity';

@Module({ 
  imports:[TypeOrmModule.forFeature([Quiz])],
  controllers: [QuizController],
  providers: [QuizService]
})
export class QuizModule {} 
