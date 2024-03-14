import { Prisma } from '@prisma/client';

export class FindClassDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.ClassWhereUniqueInput;
  where?: Prisma.ClassWhereInput;
  orderBy?: Prisma.ClassOrderByWithRelationInput;
}
