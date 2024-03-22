import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class SheetService {
  constructor(private readonly prisma: PrismaService) {}
}
