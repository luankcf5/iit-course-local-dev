/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';
const scormPackager = require('simple-scorm-packager');
const path = require('path');
const fs = require('fs').promises;

@Injectable()
export class ScormService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ScormCreateInput) {
    const uploadDir = 'scorm-inputs';
    const packageDir = 'scorm-package';
    const outputDir = 'scorm-outputs';

    async function convertHtmlFile(fileName, fileExt, filePath) {
      const isPdf = fileExt === '.pdf';
      const isImage = fileExt === '.png' || '.jpg';
      try {
        const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${fileName}</title>
        </head>
        <body>
            ${
              isPdf
                ? `<embed src="${fileName}" type="application/pdf" width="100%" height="1000px">`
                : isImage
                ? `<image alt="${fileName}" src="${fileName}" />`
                : `<video width="1080" controls>
                <source src="${fileName}" type="video/mp4">
            </video>`
            }
            
        </body>
        </html>`;

        await fs.writeFile(`${packageDir}/index.html`, html);
        fs.copyFile(filePath, `${packageDir}/${fileName}`);
        console.log(`Converted ${path.basename(filePath)} to HTML`);
      } catch (error) {
        console.error('Error converting file', error);
      }
    }

    async function convertAllDocx() {
      const files = await fs.readdir(uploadDir);
      try {
        for (const file of files) {
          const filePath = path.join(uploadDir, file);
          const fileName = path.basename(file);
          const fileExt = path.extname(file);
          await convertHtmlFile(fileName, fileExt, filePath);
          await scormZipFile(fileName);
        }
      } catch (error) {
        console.error('Error processing directory', error);
      }
    }

    async function scormZipFile(fileName) {
      const config = {
        version: '2004 4th Edition',
        organization: 'Công ty IIT',
        title: fileName,
        language: 'vi-VN',
        identifier: '00',
        masteryScore: 80,
        startingPage: 'index.html',
        source: path.join(__dirname, '..', '..', packageDir),
        package: {
          version: '1.0.0',
          zip: true,
          outputFolder: path.join(__dirname, '..', '..', outputDir),
          outputPath: path.join(
            __dirname,
            '..',
            '..',
            outputDir,
            'scorm-package.zip',
          ),
        },
      };
      scormPackager(config, function (err, result) {
        if (err) return console.log(err);
        console.log('SCORM package is created successfully:', result);
      });
    }

    convertAllDocx();

    return this.prisma.scorm.create({
      data,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ScormWhereUniqueInput;
    where?: Prisma.ScormWhereInput;
    orderBy?: Prisma.ScormOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.scorm.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findUniq(where: Prisma.ScormWhereUniqueInput) {
    return this.prisma.scorm.findUniqueOrThrow({
      where,
    });
  }

  async update(params: {
    where: Prisma.ScormWhereUniqueInput;
    data: Prisma.ScormUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.scorm.update({
      data,
      where,
    });
  }

  async removeMany(where: Prisma.ScormWhereInput) {
    return this.prisma.scorm.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.ScormWhereUniqueInput) {
    return this.prisma.scorm.delete({
      where,
    });
  }
}
