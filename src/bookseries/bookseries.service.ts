import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookseriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.BookSeriesCreateInput) {
    return this.prisma.bookSeries.create({
      data,
      include: {
        documents: {
          include: {
            topic: {
              include: {
                categories: true,
                subject: {
                  include: {
                    grades: true,
                  },
                },
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
    cursor?: Prisma.BookSeriesWhereUniqueInput;
    where?: Prisma.BookSeriesWhereInput;
    orderBy?: Prisma.BookSeriesOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.bookSeries.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        documents: {
          include: {
            topic: {
              include: {
                categories: true,
                subject: {
                  include: {
                    grades: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findUniq(where: Prisma.BookSeriesWhereUniqueInput) {
    return this.prisma.bookSeries.findUnique({
      where,
      include: {
        documents: {
          include: {
            topic: {
              include: {
                categories: true,
                subject: {
                  include: {
                    grades: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async update(params: {
    where: Prisma.BookSeriesWhereUniqueInput;
    data: Prisma.BookSeriesUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.bookSeries.update({
      data,
      where,
      include: {
        documents: {
          include: {
            topic: {
              include: {
                categories: true,
                subject: {
                  include: {
                    grades: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async removeMany(where: Prisma.BookSeriesWhereInput) {
    return this.prisma.bookSeries.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.BookSeriesWhereUniqueInput) {
    return this.prisma.bookSeries.delete({
      where,
      include: {
        documents: {
          include: {
            topic: {
              include: {
                categories: true,
                subject: {
                  include: {
                    grades: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
