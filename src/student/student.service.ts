import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.StudentCreateInput) {
    return this.prisma.student.create({
      data,
      include: {
        class: {
          include: {
            grade: {
              include: {
                school: true,
                subjects: {
                  include: {
                    topics: true,
                  },
                },
              },
            },
            year: {
              include: {},
            },
          },
        },
        transcripts: true,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.StudentWhereUniqueInput;
    where?: Prisma.StudentWhereInput;
    orderBy?: Prisma.StudentOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.student.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        class: {
          include: {
            grade: {
              include: {
                school: true,
                subjects: {
                  include: {
                    topics: true,
                  },
                },
              },
            },
            year: {
              include: {},
            },
          },
        },
        transcripts: true,
      },
    });
  }

  async findUniq(where: Prisma.StudentWhereUniqueInput) {
    return this.prisma.student.findUnique({
      where,
      include: {
        class: {
          include: {
            grade: {
              include: {
                school: true,
                subjects: {
                  include: {
                    topics: true,
                  },
                },
              },
            },
            year: {
              include: {},
            },
          },
        },
        transcripts: true,
      },
    });
  }

  async update(params: {
    where: Prisma.StudentWhereUniqueInput;
    data: Prisma.StudentUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.student.update({
      data,
      where,
      include: {
        class: {
          include: {
            grade: {
              include: {
                school: true,
                subjects: {
                  include: {
                    topics: true,
                  },
                },
              },
            },
            year: {
              include: {},
            },
          },
        },
        transcripts: true,
      },
    });
  }

  async removeMany(where: Prisma.StudentWhereInput) {
    return this.prisma.student.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.StudentWhereUniqueInput) {
    return this.prisma.student.delete({
      where,
      include: {
        class: {
          include: {
            grade: {
              include: {
                school: true,
                subjects: {
                  include: {
                    topics: true,
                  },
                },
              },
            },
            year: {
              include: {},
            },
          },
        },
        transcripts: true,
      },
    });
  }
}
