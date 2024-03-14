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
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { FindClassDto } from './dto/find-class.dto';
import { DeleteClassDto } from './dto/delete-class.dto';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Get()
  findAll(@Query() findClassDto: FindClassDto) {
    return this.classService.findAll(findClassDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findUniq({
      id: +id,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update({
      where: {
        id: +id,
      },
      data: updateClassDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteClassDto: DeleteClassDto) {
    return this.classService.removeMany({
      id: {
        in: deleteClassDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove({
      id: +id,
    });
  }
}
