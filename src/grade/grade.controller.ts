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
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { FindGradeDto } from './dto/find-grade.dto';
import { DeleteGradeDto } from './dto/delete-grade.dto';

@Controller('grades')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post()
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradeService.create(createGradeDto);
  }

  @Get()
  findAll(@Query() findGradeDto: FindGradeDto) {
    return this.gradeService.findAll(findGradeDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradeService.findUniq({
      id: +id,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradeService.update({
      where: {
        id: +id,
      },
      data: updateGradeDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteGradeDto: DeleteGradeDto) {
    return this.gradeService.removeMany({
      id: {
        in: deleteGradeDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradeService.remove({
      id: +id,
    });
  }
}
