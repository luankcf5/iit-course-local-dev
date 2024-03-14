import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class TopicService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.TopicCreateInput) {
    return this.prisma.topic.create({
      data,
      include: {
        categories: true,
        grades: {
          include: {
            subjects: true,
          },
        },
        subject: {
          include: {
            grades: true,
          },
        },
        documents: {
          include: {
            bookSeries: true,
          },
        },
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TopicWhereUniqueInput;
    where?: Prisma.TopicWhereInput;
    orderBy?: Prisma.TopicOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.topic.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        categories: true,
        grades: {
          include: {
            subjects: true,
          },
        },
        subject: {
          include: {
            grades: true,
          },
        },
        documents: {
          include: {
            bookSeries: true,
          },
        },
      },
    });
  }

  async findUniq(where: Prisma.TopicWhereUniqueInput) {
    return this.prisma.topic.findUnique({
      where,
      include: {
        categories: true,
        grades: {
          include: {
            subjects: true,
          },
        },
        subject: {
          include: {
            grades: true,
          },
        },
        documents: {
          include: {
            bookSeries: true,
          },
        },
      },
    });
  }

  async update(params: {
    where: Prisma.TopicWhereUniqueInput;
    data: Prisma.TopicUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.topic.update({
      data,
      where,
      include: {
        categories: true,
        grades: {
          include: {
            subjects: true,
          },
        },
        subject: {
          include: {
            grades: true,
          },
        },
        documents: {
          include: {
            bookSeries: true,
          },
        },
      },
    });
  }

  async removeMany(where: Prisma.TopicWhereInput) {
    return this.prisma.topic.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.TopicWhereUniqueInput) {
    return this.prisma.topic.delete({
      where,
      include: {
        categories: true,
        grades: {
          include: {
            subjects: true,
          },
        },
        subject: {
          include: {
            grades: true,
          },
        },
        documents: {
          include: {
            bookSeries: true,
          },
        },
      },
    });
  }
}
