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
import { YearService } from './year.service';
import { CreateYearDto } from './dto/create-year.dto';
import { UpdateYearDto } from './dto/update-year.dto';
import { FindYearDto } from './dto/find-year.dto';
import { DeleteYearDto } from './dto/delete-year.dto';

@Controller('years')
export class YearController {
  constructor(private readonly yearService: YearService) {}

  @Post()
  create(@Body() createYearDto: CreateYearDto) {
    return this.yearService.create(createYearDto);
  }

  @Get()
  findAll(@Query() findYearDto: FindYearDto) {
    return this.yearService.findAll(findYearDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.yearService.findUniq({
      id: +id,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateYearDto: UpdateYearDto) {
    return this.yearService.update({
      where: {
        id: +id,
      },
      data: updateYearDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteYearDto: DeleteYearDto) {
    return this.yearService.removeMany({
      id: {
        in: deleteYearDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.yearService.remove({
      id: +id,
    });
  }
}
