import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateQuestionDto } from 'src/module/quiz/dtos/question.dto';
import { QuestionService } from '../services/question.service';
import { QuizService } from '../services/quiz.service';

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService,
        private quizService: QuizService) { }


    @Post()
    @UsePipes(ValidationPipe)
    async saveQuestion(@Body() question: CreateQuestionDto) {

        const quiz = await this.quizService.getQuizById(question.quizId)
        return await this.questionService.createQuestion(question, quiz)
    }
}
