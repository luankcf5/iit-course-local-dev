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
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { FindAnswerDto } from './dto/find-answer.dto';
import { DeleteAnswerDto } from './dto/delete-answer.dto';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post('batch')
  createMany(@Body() createAnswerDto: CreateAnswerDto[]) {
    return this.answerService.createMany(createAnswerDto);
  }

  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(createAnswerDto);
  }

  @Get()
  findAll(@Query() findAnswerDto: FindAnswerDto) {
    return this.answerService.findAll(findAnswerDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerService.findUniq({
      id: +id,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update({
      where: {
        id: +id,
      },
      data: updateAnswerDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteAnswerDto: DeleteAnswerDto) {
    return this.answerService.removeMany({
      id: {
        in: deleteAnswerDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerService.remove({
      id: +id,
    });
  }
}
