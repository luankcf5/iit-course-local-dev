import { Module } from '@nestjs/common';
import { BookseriesService } from './bookseries.service';
import { BookseriesController } from './bookseries.controller';

@Module({
  controllers: [BookseriesController],
  providers: [BookseriesService],
})
export class BookseriesModule {}
