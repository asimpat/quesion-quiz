import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from '../entities/quiz.entity';
import { Repository } from 'typeorm';
import { CreateQuizDto } from '../dtos/quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>,
  ) {}

  getQuiz() {
    return [1, 2, 3];
  } 

  async getQuizById(id:number){
    const quizId= await this.quizRepository.findOne({
        where: {id},
        relations:['questions']     
    })
    return quizId  
  }

 async createQuiz(quiz:CreateQuizDto):Promise<Quiz>{
    const newQuiz= await this.quizRepository.save(quiz)
    return newQuiz
  }
}
