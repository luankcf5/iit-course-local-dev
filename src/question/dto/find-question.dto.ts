import { Prisma } from '@prisma/client';

export class FindQuestionDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.QuestionWhereUniqueInput;
  where?: Prisma.QuestionWhereInput;
  orderBy?: Prisma.QuestionOrderByWithRelationInput;
}
