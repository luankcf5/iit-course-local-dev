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
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { FindTopicDto } from './dto/find-topic.dto';
import { DeleteTopicDto } from './dto/delete-topic.dto';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicService.create(createTopicDto);
  }

  @Get()
  findAll(@Query() findTopicDto: FindTopicDto) {
    return this.topicService.findAll(findTopicDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicService.findUniq({
      id: +id,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicService.update({
      where: {
        id: +id,
      },
      data: updateTopicDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteTopicDto: DeleteTopicDto) {
    return this.topicService.removeMany({
      id: {
        in: deleteTopicDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicService.remove({
      id: +id,
    });
  }
}
