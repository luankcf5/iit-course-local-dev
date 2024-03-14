import { Prisma } from '@prisma/client';

export class FindSubjectDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.SubjectWhereUniqueInput;
  where?: Prisma.SubjectWhereInput;
  orderBy?: Prisma.SubjectOrderByWithRelationInput;
}
