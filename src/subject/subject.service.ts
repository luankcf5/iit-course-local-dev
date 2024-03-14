import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.SubjectCreateInput) {
    return this.prisma.subject.create({
      data,
      include: {
        grades: true,
        topics: {
          include: {
            categories: true,
          },
        },
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SubjectWhereUniqueInput;
    where?: Prisma.SubjectWhereInput;
    orderBy?: Prisma.SubjectOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.subject.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        grades: true,
        topics: {
          include: {
            categories: true,
          },
        },
      },
    });
  }

  async findUniq(where: Prisma.SubjectWhereUniqueInput) {
    return this.prisma.subject.findUniqueOrThrow({
      where,
      include: {
        grades: true,
        topics: {
          include: {
            categories: true,
          },
        },
      },
    });
  }

  async update(params: {
    where: Prisma.SubjectWhereUniqueInput;
    data: Prisma.SubjectUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.subject.update({
      data,
      where,
      include: {
        grades: true,
        topics: {
          include: {
            categories: true,
          },
        },
      },
    });
  }

  async removeMany(where: Prisma.SubjectWhereInput) {
    return this.prisma.subject.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.SubjectWhereUniqueInput) {
    return this.prisma.subject.delete({
      where,
      include: {
        grades: true,
        topics: {
          include: {
            categories: true,
          },
        },
      },
    });
  }
}
