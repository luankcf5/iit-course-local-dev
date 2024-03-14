import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExamService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ExamCreateInput) {
    return this.prisma.exam.create({
      data,
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
        topic: {
          include: {
            grades: true,
            subject: {
              include: {
                grades: true,
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
    cursor?: Prisma.ExamWhereUniqueInput;
    where?: Prisma.ExamWhereInput;
    orderBy?: Prisma.ExamOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.exam.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
        topic: {
          include: {
            grades: true,
            subject: {
              include: {
                grades: true,
              },
            },
          },
        },
      },
    });
  }

  async findUniq(where: Prisma.ExamWhereUniqueInput) {
    return this.prisma.exam.findUniqueOrThrow({
      where,
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
        topic: {
          include: {
            grades: true,
            subject: {
              include: {
                grades: true,
              },
            },
          },
        },
      },
    });
  }

  async update(params: {
    where: Prisma.ExamWhereUniqueInput;
    data: Prisma.ExamUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.exam.update({
      data,
      where,
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
        topic: {
          include: {
            grades: true,
            subject: {
              include: {
                grades: true,
              },
            },
          },
        },
      },
    });
  }

  async removeMany(where: Prisma.ExamWhereInput) {
    return this.prisma.exam.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.ExamWhereUniqueInput) {
    return this.prisma.exam.delete({
      where,
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
        topic: {
          include: {
            grades: true,
            subject: {
              include: {
                grades: true,
              },
            },
          },
        },
      },
    });
  }
}
