import { Prisma } from '@prisma/client';

export class FindBookseryDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.BookSeriesWhereUniqueInput;
  where?: Prisma.BookSeriesWhereInput;
  orderBy?: Prisma.BookSeriesOrderByWithRelationInput;
}
