import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Post,
} from '@nestjs/common';
import { TranscriptService } from './transcript.service';
import { UpdateTranscriptDto } from './dto/update-transcript.dto';
import { FindTranscriptDto } from './dto/find-transcript.dto';
import { DeleteTranscriptDto } from './dto/delete-transcript.dto';
import { CreateTranscriptDto } from './dto/create-transcript.dto';

@Controller('transcripts')
export class TranscriptController {
  constructor(private readonly transcriptService: TranscriptService) {}

  @Post()
  create(@Body() createTranscriptDto: CreateTranscriptDto) {
    return this.transcriptService.create(createTranscriptDto);
  }

  @Get()
  findAll(@Query() findTranscriptDto: FindTranscriptDto) {
    return this.transcriptService.findAll(findTranscriptDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transcriptService.findUniq({
      id: +id,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTranscriptDto: UpdateTranscriptDto,
  ) {
    return this.transcriptService.update({
      where: {
        id: +id,
      },
      data: updateTranscriptDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteTranscriptDto: DeleteTranscriptDto) {
    return this.transcriptService.removeMany({
      id: {
        in: deleteTranscriptDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transcriptService.remove({
      id: +id,
    });
  }
}
