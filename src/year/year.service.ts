import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class YearService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.YearCreateInput) {
    return this.prisma.year.create({
      data,
      include: {
        classes: {
          include: {
            grade: {
              include: {
                school: true,
              },
            },
            students: true,
          },
        },
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.YearWhereUniqueInput;
    where?: Prisma.YearWhereInput;
    orderBy?: Prisma.YearOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.year.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        classes: {
          include: {
            grade: {
              include: {
                school: true,
              },
            },
            students: true,
          },
        },
      },
    });
  }

  async findUniq(where: Prisma.YearWhereUniqueInput) {
    return this.prisma.year.findUnique({
      where,
      include: {
        classes: {
          include: {
            grade: {
              include: {
                school: true,
              },
            },
            students: true,
          },
        },
      },
    });
  }

  async update(params: {
    where: Prisma.YearWhereUniqueInput;
    data: Prisma.YearUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.year.update({
      data,
      where,
      include: {
        classes: {
          include: {
            grade: {
              include: {
                school: true,
              },
            },
            students: true,
          },
        },
      },
    });
  }

  async removeMany(where: Prisma.YearWhereInput) {
    return this.prisma.year.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.YearWhereUniqueInput) {
    return this.prisma.year.delete({
      where,
      include: {
        classes: {
          include: {
            grade: {
              include: {
                school: true,
              },
            },
            students: true,
          },
        },
      },
    });
  }
}
