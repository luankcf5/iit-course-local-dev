import { Module } from '@nestjs/common';
import { ScormService } from './scorm.service';
import { ScormController } from './scorm.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: 'scorm-inputs',
    }),
  ],
  controllers: [ScormController],
  providers: [ScormService],
})
export class ScormModule {}
