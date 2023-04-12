import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDto } from 'src/module/quiz/dtos/question.dto';
import { Question } from 'src/module/quiz/entities/question.entity';
import { Quiz } from 'src/module/quiz/entities/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
    constructor(@InjectRepository(Question) private readonly questionRepository:Repository<Question>){}



   async createQuestion(question:CreateQuestionDto, quiz:Quiz):Promise<Question>{
        const newQuestion = await this.questionRepository.save({
            question:question.question
        });

        quiz.questions = [...quiz.questions,newQuestion]
        await quiz.save()

        return newQuestion
    }

}
