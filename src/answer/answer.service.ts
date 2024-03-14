import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.AnswerCreateInput) {
    return this.prisma.answer.create({
      data,
    });
  }

  async createMany(data: Prisma.AnswerCreateInput[]) {
    const res = [];
    for (const d of data) {
      const ans = await this.prisma.answer.create({
        data: d,
      });
      res.push(ans);
    }
    return res;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AnswerWhereUniqueInput;
    where?: Prisma.AnswerWhereInput;
    orderBy?: Prisma.AnswerOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.answer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findUniq(where: Prisma.AnswerWhereUniqueInput) {
    return this.prisma.answer.findUniqueOrThrow({
      where,
    });
  }

  async update(params: {
    where: Prisma.AnswerWhereUniqueInput;
    data: Prisma.AnswerUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.answer.update({
      data,
      where,
    });
  }

  async removeMany(where: Prisma.AnswerWhereInput) {
    return this.prisma.answer.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.AnswerWhereUniqueInput) {
    return this.prisma.answer.delete({
      where,
    });
  }
}
