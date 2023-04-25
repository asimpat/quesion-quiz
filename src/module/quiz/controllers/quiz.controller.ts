import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuizService } from '../services/quiz.service';
import { CreateQuizDto } from '../dtos/quiz.dto';
import { Quiz } from '../entities/quiz.entity';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService){}
 
    @Get('/')
    async getAllQuiz(){
        return await this.quizService.getAllQuiz()
    }

    @Get(':id')
   async getQuizById(@Param('id', ParseIntPipe) id:number){
        const quizId= await this.quizService.getQuizById(id)
        return quizId
    }


    @Post('create')
    @UsePipes(ValidationPipe)
   async createQuiz(@Body() quiz){
        const quizdata= await this.quizService.createQuiz(quiz)
        return quizdata
    } 
}
