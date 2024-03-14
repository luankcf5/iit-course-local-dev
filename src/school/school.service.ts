import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class SchoolService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.SchoolCreateInput) {
    return this.prisma.school.create({
      data,
      include: {
        grades: {
          include: {
            classes: true,
          },
        },
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SchoolWhereUniqueInput;
    where?: Prisma.SchoolWhereInput;
    orderBy?: Prisma.SchoolOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.school.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        grades: {
          include: {
            classes: true,
          },
        },
      },
    });
  }

  async findUniq(where: Prisma.SchoolWhereUniqueInput) {
    return this.prisma.school.findUniqueOrThrow({
      where,
      include: {
        grades: {
          select: {
            classes: true,
          },
        },
      },
    });
  }

  async update(params: {
    where: Prisma.SchoolWhereUniqueInput;
    data: Prisma.SchoolUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.school.update({
      data,
      where,
      include: {
        grades: {
          select: {
            classes: true,
          },
        },
      },
    });
  }

  async removeMany(where: Prisma.SchoolWhereInput) {
    return this.prisma.school.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.SchoolWhereUniqueInput) {
    return this.prisma.school.delete({
      where,
      include: {
        grades: {
          include: {
            classes: true,
          },
        },
      },
    });
  }
}
