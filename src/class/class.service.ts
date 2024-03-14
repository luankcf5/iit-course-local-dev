import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClassService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ClassCreateInput) {
    return this.prisma.class.create({
      data,
      include: {
        grade: {
          include: {
            subjects: true,
          },
        },
        year: true,
        students: {
          include: {
            class: {
              include: {
                grade: true,
              },
            },
          },
        },
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ClassWhereUniqueInput;
    where?: Prisma.ClassWhereInput;
    orderBy?: Prisma.ClassOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.class.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        grade: {
          include: {
            subjects: true,
          },
        },
        year: true,
        students: {
          include: {
            class: {
              include: {
                grade: true,
              },
            },
          },
        },
      },
    });
  }

  async findUniq(where: Prisma.ClassWhereUniqueInput) {
    return this.prisma.class.findUnique({
      where,
      include: {
        grade: {
          include: {
            subjects: true,
          },
        },
        year: true,
        students: {
          include: {
            class: {
              include: {
                grade: true,
              },
            },
          },
        },
      },
    });
  }

  async update(params: {
    where: Prisma.ClassWhereUniqueInput;
    data: Prisma.ClassUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.class.update({
      data,
      where,
      include: {
        grade: {
          include: {
            subjects: true,
          },
        },
        year: true,
        students: {
          include: {
            class: {
              include: {
                grade: true,
              },
            },
          },
        },
      },
    });
  }

  async removeMany(where: Prisma.ClassWhereInput) {
    return this.prisma.class.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.ClassWhereUniqueInput) {
    return this.prisma.class.delete({
      where,
      include: {
        grade: {
          include: {
            subjects: true,
          },
        },
        year: true,
        students: {
          include: {
            class: {
              include: {
                grade: true,
              },
            },
          },
        },
      },
    });
  }
}
