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
import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { FindCalendarDto } from './dto/find-calendar.dto';
import { DeleteCalendarDto } from './dto/delete-calendar.dto';

@Controller('calendars')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post()
  create(@Body() createCalendarDto: CreateCalendarDto) {
    return this.calendarService.create(createCalendarDto);
  }

  @Get()
  findAll(@Query() findCalendarDto: FindCalendarDto) {
    return this.calendarService.findAll(findCalendarDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calendarService.findUniq({
      id: +id,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCalendarDto: UpdateCalendarDto,
  ) {
    return this.calendarService.update({
      where: {
        id: +id,
      },
      data: updateCalendarDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteCalendarDto: DeleteCalendarDto) {
    return this.calendarService.removeMany({
      id: {
        in: deleteCalendarDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calendarService.remove({
      id: +id,
    });
  }
}
