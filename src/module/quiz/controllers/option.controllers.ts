import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OptionService } from '../services/option.service';
import { QuestionService } from '../services/question.service';
import { CreateOptionDto } from '../dtos/option.dto';

@Controller('question/option')
export class OptionContoller {
  constructor(
    private readonly optionService: OptionService,
    private questionService: QuestionService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async saveOptionToQuestion(@Body() createOption: CreateOptionDto) {
    const question = await this.questionService.getQuestionById(
      createOption.questionId,
    );
    return await this.optionService.createNewOption(createOption, question); 

  }
}
