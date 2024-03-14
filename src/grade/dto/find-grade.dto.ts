import { Prisma } from '@prisma/client';

export class FindGradeDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.GradeWhereUniqueInput;
  where?: Prisma.GradeWhereInput;
  orderBy?: Prisma.GradeOrderByWithRelationInput;
}
