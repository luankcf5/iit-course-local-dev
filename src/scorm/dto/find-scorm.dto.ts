import { Prisma } from '@prisma/client';

export class FindScormDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.ScormWhereUniqueInput;
  where?: Prisma.ScormWhereInput;
  orderBy?: Prisma.ScormOrderByWithRelationInput;
}
