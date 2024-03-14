import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class DocumentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.DocumentCreateInput) {
    return this.prisma.document.create({
      data,
      include: {
        category: true,
        topic: {
          include: {
            grades: {
              include: {
                subjects: true,
              },
            },
            categories: true,
            subject: {
              include: {
                topics: true,
                grades: true,
              },
            },
          },
        },
        bookSeries: true,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DocumentWhereUniqueInput;
    where?: Prisma.DocumentWhereInput;
    orderBy?: Prisma.DocumentOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.document.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        category: true,
        topic: {
          include: {
            grades: {
              include: {
                subjects: true,
              },
            },
            categories: true,
            subject: {
              include: {
                topics: true,
                grades: true,
              },
            },
          },
        },
        bookSeries: true,
      },
    });
  }

  async findUniq(where: Prisma.DocumentWhereUniqueInput) {
    return this.prisma.document.findUnique({
      where,
      include: {
        category: true,
        topic: {
          include: {
            grades: {
              include: {
                subjects: true,
              },
            },
            categories: true,
            subject: {
              include: {
                topics: true,
                grades: true,
              },
            },
          },
        },
        bookSeries: true,
      },
    });
  }

  async update(params: {
    where: Prisma.DocumentWhereUniqueInput;
    data: Prisma.DocumentUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.document.update({
      data,
      where,
      include: {
        category: true,
        topic: {
          include: {
            grades: {
              include: {
                subjects: true,
              },
            },
            categories: true,
            subject: {
              include: {
                topics: true,
                grades: true,
              },
            },
          },
        },
        bookSeries: true,
      },
    });
  }

  async removeMany(where: Prisma.DocumentWhereInput) {
    return this.prisma.document.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.DocumentWhereUniqueInput) {
    return this.prisma.document.delete({
      where,
      include: {
        category: true,
        topic: {
          include: {
            grades: {
              include: {
                subjects: true,
              },
            },
            categories: true,
            subject: {
              include: {
                topics: true,
                grades: true,
              },
            },
          },
        },
        bookSeries: true,
      },
    });
  }
}
