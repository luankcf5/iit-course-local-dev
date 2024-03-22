import { Module } from '@nestjs/common';
import { SheetService } from './sheet.service';
import { SheetController } from './sheet.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: 'inputs/exam/baithi01',
    }),
  ],
  controllers: [SheetController],
  providers: [SheetService],
})
export class SheetModule {}
