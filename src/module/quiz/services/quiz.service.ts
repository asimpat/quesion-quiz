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

  // to query the database and get all the quiz
  async getAllQuiz():Promise<[Quiz[], number] > {
   return await this.quizRepository.createQueryBuilder('q')
   .leftJoinAndSelect('q.questions', 'qt')
  //  .leftJoinAndSelect('q.options', 'o')
  // .take(1)
   .getManyAndCount()
  } 

  // to get the quiz by it ID and the questions for that ID
  async getQuizById(id:number){
    const quizId= await this.quizRepository.findOne({
        where: {id},
        relations:['questions', 'questions.options']     
    })
    return quizId  
  }

  // to create a new quiz
 async createQuiz(quiz:CreateQuizDto):Promise<Quiz>{
    const newQuiz= await this.quizRepository.save(quiz)
    return newQuiz
  }
}
