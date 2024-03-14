import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({
      data,
      include: {
        topics: true,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoryWhereUniqueInput;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.category.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        topics: true,
      },
    });
  }

  async findUniq(where: Prisma.CategoryWhereUniqueInput) {
    return this.prisma.category.findUnique({
      where,
      include: {
        topics: true,
      },
    });
  }

  async update(params: {
    where: Prisma.CategoryWhereUniqueInput;
    data: Prisma.CategoryUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.category.update({
      data,
      where,
      include: {
        topics: true,
      },
    });
  }

  async removeMany(where: Prisma.CategoryWhereInput) {
    return this.prisma.category.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.CategoryWhereUniqueInput) {
    return this.prisma.category.delete({
      where,
      include: {
        topics: true,
      },
    });
  }
}
