import { Prisma } from '@prisma/client';

export class CreateAnswerDto implements Prisma.AnswerCreateInput {
  content: string;
  correct: boolean;
}
