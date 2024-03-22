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
import { exec } from 'child_process';

@Controller('sheets')
export class SheetController {
  constructor(private readonly sheetService: SheetService) {}

  @Post('upload')
  runPythonScript() {
    exec('python ./ORMChecker/main.py', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
    });
  }

  // @UseInterceptors(
  //   AnyFilesInterceptor({
  //     storage: diskStorage({
  //       destination: 'inputs/exam/baithi01',
  //       filename: (req, file, cb) => {
  //         cb(null, Buffer.from(file.originalname, 'latin1').toString('utf8'));
  //       },
  //     }),
  //   }),
  // )

  // async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
  //   return files;
  // }

  @Get()
  async getArrayData(): Promise<any[]> {
    const workbook = XLSX.readFile(
      './outputs/exam/baithi01/KetQuaKiemTra/Results.csv',
    );
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const dataSheet = XLSX.utils.sheet_to_json(worksheet);
    return dataSheet.map((sheet: any) => ({
      name: sheet.file_id,
      examCode: `${sheet.code1}${sheet.code2}${sheet.code3}`,
      studentId: `${sheet.id1}${sheet.id2}${sheet.id3}${sheet.id4}${sheet.id5}${sheet.id6}`,
      questionAnswers: Array.from({ length: 120 }).map(
        (answer, index) => sheet[`q${index + 1}`],
      ),
    }));
  }
}
