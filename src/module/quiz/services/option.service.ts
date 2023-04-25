import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Options } from '../entities/option.entity';
import { CreateOptionDto } from '../dtos/option.dto';
import { Question } from '../entities/question.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Options) private readonly optionRepository: Repository<Options>,
  ) {}


  async createNewOption(option:CreateOptionDto, question:Question){
    const newOption = await this.optionRepository.save({
      text:option.text,
      IsCorrect:option.isCorrect
    })

    question.options = [...question.options, newOption]
    await question.save()

    return newOption
  }
 

}
