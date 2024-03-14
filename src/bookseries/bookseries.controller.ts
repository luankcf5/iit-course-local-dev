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
import { BookseriesService } from './bookseries.service';
import { CreateBookseryDto } from './dto/create-booksery.dto';
import { UpdateBookseryDto } from './dto/update-booksery.dto';
import { FindBookseryDto } from './dto/find-booksery.dto';
import { DeleteBookseryDto } from './dto/delete-booksery.dto';

@Controller('bookseries')
export class BookseriesController {
  constructor(private readonly bookseriesService: BookseriesService) {}

  @Post()
  create(@Body() createBookseryDto: CreateBookseryDto) {
    return this.bookseriesService.create(createBookseryDto);
  }

  @Get()
  findAll(@Query() findBookseryDto: FindBookseryDto) {
    return this.bookseriesService.findAll(findBookseryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookseriesService.findUniq({
      id: +id,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookseryDto: UpdateBookseryDto,
  ) {
    return this.bookseriesService.update({
      where: {
        id: +id,
      },
      data: updateBookseryDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteBookseryDto: DeleteBookseryDto) {
    return this.bookseriesService.removeMany({
      id: {
        in: deleteBookseryDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookseriesService.remove({
      id: +id,
    });
  }
}
