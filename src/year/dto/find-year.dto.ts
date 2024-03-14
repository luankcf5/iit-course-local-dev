import { Prisma } from '@prisma/client';

export class FindYearDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.YearWhereUniqueInput;
  where?: Prisma.YearWhereInput;
  orderBy?: Prisma.YearOrderByWithRelationInput;
}
