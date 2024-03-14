import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.QuestionCreateInput) {
    return this.prisma.question.create({
      data,
      include: {
        answers: true,
        topic: {
          include: {
            subject: true,
          },
        },
        exam: {
          include: {
            topic: {
              include: {
                grades: {
                  include: {
                    school: true,
                  },
                },
                subject: true,
              },
            },
          },
        },
      },
    });
  }

  async createMany(data: Prisma.QuestionCreateInput[]) {
    const res = [];
    for (const d of data) {
      const ans = await this.prisma.question.create({
        data: d,
        include: {
          answers: true,
          topic: {
            include: {
              subject: true,
            },
          },
          exam: {
            include: {
              topic: {
                include: {
                  grades: {
                    include: {
                      school: true,
                    },
                  },
                  subject: true,
                },
              },
            },
          },
        },
      });
      res.push(ans);
    }
    return res;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.QuestionWhereUniqueInput;
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.question.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        answers: true,
        topic: {
          include: {
            subject: true,
          },
        },
        exam: {
          include: {
            topic: {
              include: {
                grades: {
                  include: {
                    school: true,
                  },
                },
                subject: true,
              },
            },
          },
        },
      },
    });
  }

  async findUniq(where: Prisma.QuestionWhereUniqueInput) {
    return this.prisma.question.findUniqueOrThrow({
      where,
      include: {
        answers: true,
        exam: {
          include: {
            topic: {
              include: {
                grades: {
                  include: {
                    school: true,
                  },
                },
                subject: true,
              },
            },
          },
        },
      },
    });
  }

  async update(params: {
    where: Prisma.QuestionWhereUniqueInput;
    data: Prisma.QuestionUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.question.update({
      data,
      where,
      include: {
        answers: true,
        topic: {
          include: {
            subject: true,
          },
        },
        exam: {
          include: {
            topic: {
              include: {
                grades: {
                  include: {
                    school: true,
                  },
                },
                subject: true,
              },
            },
          },
        },
      },
    });
  }

  async removeMany(where: Prisma.QuestionWhereInput) {
    return this.prisma.question.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.QuestionWhereUniqueInput) {
    return this.prisma.question.delete({
      where,
      include: {
        answers: true,
        topic: {
          include: {
            subject: true,
          },
        },
        exam: {
          include: {
            topic: {
              include: {
                grades: {
                  include: {
                    school: true,
                  },
                },
                subject: true,
              },
            },
          },
        },
      },
    });
  }
}
