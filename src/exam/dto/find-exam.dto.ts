import { Prisma } from '@prisma/client';

export class FindExamDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.ExamWhereUniqueInput;
  where?: Prisma.ExamWhereInput;
  orderBy?: Prisma.ExamOrderByWithRelationInput;
}
