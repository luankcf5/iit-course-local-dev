import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { FindQuestionDto } from './dto/find-question.dto';
import { DeleteQuestionDto } from './dto/delete-question.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('batch')
  createMany(@Body() createQuestionDto: CreateQuestionDto[]) {
    return this.questionService.createMany(createQuestionDto);
  }

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  findAll(@Query() findQuestionDto: FindQuestionDto) {
    return this.questionService.findAll(findQuestionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findUniq({
      id: +id,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update({
      where: {
        id: +id,
      },
      data: updateQuestionDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteQuestionDto: DeleteQuestionDto) {
    return this.questionService.removeMany({
      id: {
        in: deleteQuestionDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove({
      id: +id,
    });
  }
}
