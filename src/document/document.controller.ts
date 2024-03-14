import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FindDocumentDto } from './dto/find-document.dto';
import { DeleteDocumentDto } from './dto/delete-document.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: 'upload',
        filename: (req, file, cb) => {
          cb(null, Buffer.from(file.originalname, 'latin1').toString('utf8'));
        },
      }),
    }),
  )
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return files;
  }

  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentService.create(createDocumentDto);
  }

  @Get()
  findAll(@Query() findDocumentDto: FindDocumentDto) {
    return this.documentService.findAll(findDocumentDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentService.findUniq({
      id: +id,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentService.update({
      where: {
        id: +id,
      },
      data: updateDocumentDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteDocumentDto: DeleteDocumentDto) {
    return this.documentService.removeMany({
      id: {
        in: deleteDocumentDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentService.remove({
      id: +id,
    });
  }
}
