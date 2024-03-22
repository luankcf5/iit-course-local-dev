import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class SheetService {
  constructor(private readonly prisma: PrismaService) {}
}
