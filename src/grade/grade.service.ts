import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class GradeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.GradeCreateInput) {
    return this.prisma.grade.create({
      data,
      include: {
        school: true,
        subjects: true,
        classes: true,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.GradeWhereUniqueInput;
    where?: Prisma.GradeWhereInput;
    orderBy?: Prisma.GradeOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.grade.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        school: true,
        subjects: true,
        classes: true,
      },
    });
  }

  async findUniq(where: Prisma.GradeWhereUniqueInput) {
    return this.prisma.grade.findUniqueOrThrow({
      where,
      include: {
        school: true,
        subjects: true,
        classes: true,
      },
    });
  }

  async update(params: {
    where: Prisma.GradeWhereUniqueInput;
    data: Prisma.GradeUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.grade.update({
      data,
      where,
      include: {
        school: true,
        subjects: true,
        classes: true,
      },
    });
  }

  async removeMany(where: Prisma.GradeWhereInput) {
    return this.prisma.grade.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.GradeWhereUniqueInput) {
    return this.prisma.grade.delete({
      where,
      include: {
        school: true,
        subjects: true,
        classes: true,
      },
    });
  }
}
