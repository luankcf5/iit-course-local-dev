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
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { FindSchoolDto } from './dto/find-school.dto';
import { DeleteSchoolDto } from './dto/delete-school.dto';

@Controller('schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }

  @Get()
  findAll(@Query() findSchoolDto: FindSchoolDto) {
    return this.schoolService.findAll(findSchoolDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolService.findUniq({
      id: +id,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolService.update({
      where: {
        id: +id,
      },
      data: updateSchoolDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteSchoolDto: DeleteSchoolDto) {
    return this.schoolService.removeMany({
      id: {
        in: deleteSchoolDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolService.remove({
      id: +id,
    });
  }
}
