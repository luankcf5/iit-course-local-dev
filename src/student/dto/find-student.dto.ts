import { Prisma } from '@prisma/client';

export class FindStudentDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.StudentWhereUniqueInput;
  where?: Prisma.StudentWhereInput;
  orderBy?: Prisma.StudentOrderByWithRelationInput;
}
