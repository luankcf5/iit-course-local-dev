import { Prisma } from '@prisma/client';

export class FindAnswerDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.AnswerWhereUniqueInput;
  where?: Prisma.AnswerWhereInput;
  orderBy?: Prisma.AnswerOrderByWithRelationInput;
}
