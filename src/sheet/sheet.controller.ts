import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as XLSX from 'xlsx';
import { SheetService } from './sheet.service';
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

@Controller('sheets')
export class SheetController {
  constructor(private readonly sheetService: SheetService) {}

  private clearDirectory(directory: string) {
    fs.readdir(directory, (err, files) => {
      if (err) throw err;

      files.forEach((file) => {
        const ext = path.extname(file).toLowerCase();
        const imageExtensions = [
          '.png',
          '.jpg',
          '.jpeg',
          '.gif',
          '.bmp',
          '.tiff',
          '.webp',
        ];

        if (imageExtensions.includes(ext)) {
          fs.unlink(path.join(directory, file), (err) => {
            if (err) throw err;
            console.log(`Deleted image file: ${file}`);
          });
        }
      });
    });
  }

  @Post('upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: 'inputs/exam/baithi01',
        filename: (req, file, cb) => {
          cb(null, Buffer.from(file.originalname, 'latin1').toString('utf8'));
        },
      }),
    }),
  )
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    await new Promise<void>((resolve, reject) => {
      const child = spawn('main.exe');

      child.on('close', (code) => {
        console.log(`main.exe exited with code ${code}`);

        this.clearDirectory('inputs/exam/baithi01');

        resolve();
      });

      child.on('error', (err) => {
        console.error('Failed to start subprocess.', err);
        reject(err);
      });
    });

    return files;
  }

  @Get()
  async getArrayData(): Promise<any[]> {
    const workbook = XLSX.readFile(
      './outputs/exam/baithi01/KetQuaKiemTra/Results.csv',
    );
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const dataSheet = XLSX.utils.sheet_to_json(worksheet);
    return dataSheet
      .map((sheet: any) => ({
        name: sheet.file_id,
        examCode: `${sheet.code1}${sheet.code2}${sheet.code3}`,
        studentId: `${sheet.id1}${sheet.id2}${sheet.id3}${sheet.id4}${sheet.id5}${sheet.id6}`,
        questionAnswers: Array.from({ length: 120 }).map(
          (answer, index) => sheet[`q${index + 1}`],
        ),
      }))
      .reverse();
  }
}
