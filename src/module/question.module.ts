import { Module } from '@nestjs/common';
import { Question } from 'src/module/quiz/entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/module/quiz/entities/quiz.entity';
import { QuestionController } from './quiz/controllers/question.controller';
import { QuizService } from './quiz/services/quiz.service';
import { QuestionService } from './quiz/services/question.service';

@Module({
  imports:[TypeOrmModule.forFeature([ Question, Quiz])],
  controllers: [QuestionController],
  providers: [QuestionService, QuizService]
})
export class QuestionModule {}
