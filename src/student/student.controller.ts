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
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FindStudentDto } from './dto/find-student.dto';
import { DeleteStudentDto } from './dto/delete-student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll(@Query() findStudentDto: FindStudentDto) {
    return this.studentService.findAll(findStudentDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findUniq({
      id: +id,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update({
      where: {
        id: +id,
      },
      data: updateStudentDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteStudentDto: DeleteStudentDto) {
    return this.studentService.removeMany({
      id: {
        in: deleteStudentDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove({
      id: +id,
    });
  }
}
