import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuizService } from '../services/quiz.service';
import { CreateQuizDto } from '../dtos/quiz.dto';
import { Quiz } from '../entities/quiz.entity';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService){}
 
    @Get('/')
    getQuiz(){
        return this.quizService.getQuiz()
    }

    @Get(':id')
   async getQuizById(@Param('id', ParseIntPipe) id:number){
        return await this.quizService.getQuizById(id)
    }


    @Post('create')
    @UsePipes(ValidationPipe)
   async createQuiz(@Body() quiz){
        const quizdata= await this.quizService.createQuiz(quiz)
        return quizdata
    } 
}
