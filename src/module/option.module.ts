import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Options } from './quiz/entities/option.entity';
import { OptionContoller } from './quiz/controllers/option.controllers';
import { OptionService } from './quiz/services/option.service';
import { QuestionService } from './quiz/services/question.service';
import { Question } from './quiz/entities/question.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ Options, Question])],
  controllers: [OptionContoller],
  providers: [OptionService,QuestionService] 
})
export class OptionModule {}
