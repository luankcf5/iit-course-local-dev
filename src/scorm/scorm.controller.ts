import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateScormDto } from './dto/create-scorm.dto';
import { DeleteScormDto } from './dto/delete-scorm.dto';
import { FindScormDto } from './dto/find-scorm.dto';
import { UpdateScormDto } from './dto/update-scorm.dto';
import { ScormService } from './scorm.service';
import * as fs from 'fs';
import * as path from 'path';

@Controller('scorms')
export class ScormController {
  constructor(private readonly scormService: ScormService) {}

  private clearDirectory(directory: string) {
    fs.readdir(directory, (err, files) => {
      if (err) throw err;

      files.forEach((file) => {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw err;
          console.log(`Deleted image file: ${file}`);
        });
      });
    });
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'scorm-inputs',
        filename: (req, file, cb) => {
          cb(null, Buffer.from(file.originalname, 'latin1').toString('utf8'));
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @Get('delete')
  async delete() {
    await this.clearDirectory('scorm-package');
    await this.clearDirectory('scorm-inputs');
    return null;
  }

  @Post()
  create(@Body() createScormDto: CreateScormDto) {
    return this.scormService.create(createScormDto);
  }

  @Get()
  findAll(@Query() findScormDto: FindScormDto) {
    return this.scormService.findAll(findScormDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scormService.findUniq({
      id: +id,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScormDto: UpdateScormDto) {
    return this.scormService.update({
      where: {
        id: +id,
      },
      data: updateScormDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteScormDto: DeleteScormDto) {
    return this.scormService.removeMany({
      id: {
        in: deleteScormDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scormService.remove({
      id: +id,
    });
  }
}
