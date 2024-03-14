import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class CalendarService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CalendarCreateInput) {
    return this.prisma.calendar.create({
      data,
      include: {
        class: true,
        subject: true,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CalendarWhereUniqueInput;
    where?: Prisma.CalendarWhereInput;
    orderBy?: Prisma.CalendarOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.calendar.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        class: true,
        subject: true,
      },
    });
  }

  async findUniq(where: Prisma.CalendarWhereUniqueInput) {
    return this.prisma.calendar.findUnique({
      where,
      include: {
        class: true,
        subject: true,
      },
    });
  }

  async update(params: {
    where: Prisma.CalendarWhereUniqueInput;
    data: Prisma.CalendarUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.calendar.update({
      data,
      where,
      include: {
        class: true,
        subject: true,
      },
    });
  }

  async removeMany(where: Prisma.CalendarWhereInput) {
    return this.prisma.calendar.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.CalendarWhereUniqueInput) {
    return this.prisma.calendar.delete({
      where,
      include: {
        class: true,
        subject: true,
      },
    });
  }
}
