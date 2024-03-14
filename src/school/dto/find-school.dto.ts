import { Prisma } from '@prisma/client';

export class FindSchoolDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.SchoolWhereUniqueInput;
  where?: Prisma.SchoolWhereInput;
  orderBy?: Prisma.SchoolOrderByWithRelationInput;
}
