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
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { FindExamDto } from './dto/find-exam.dto';
import { DeleteExamDto } from './dto/delete-exam.dto';

@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.examService.create(createExamDto);
  }

  @Get()
  findAll(@Query() findExamDto: FindExamDto) {
    return this.examService.findAll(findExamDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examService.findUniq({
      id: +id,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.examService.update({
      where: {
        id: +id,
      },
      data: updateExamDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteExamDto: DeleteExamDto) {
    return this.examService.removeMany({
      id: {
        in: deleteExamDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examService.remove({
      id: +id,
    });
  }
}
