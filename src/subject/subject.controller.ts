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
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { FindSubjectDto } from './dto/find-subject.dto';
import { DeleteSubjectDto } from './dto/delete-subject.dto';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  @Get()
  findAll(@Query() findSubjectDto: FindSubjectDto) {
    return this.subjectService.findAll(findSubjectDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findUniq({
      id: +id,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectService.update({
      where: {
        id: +id,
      },
      data: updateSubjectDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteSubjectDto: DeleteSubjectDto) {
    return this.subjectService.removeMany({
      id: {
        in: deleteSubjectDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove({
      id: +id,
    });
  }
}
