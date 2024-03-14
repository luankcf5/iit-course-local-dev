import { Prisma } from '@prisma/client';

export class CreateQuestionDto implements Prisma.QuestionCreateInput {
  level: number;
  point: number;
  content: string;
  answers: Prisma.AnswerCreateNestedManyWithoutQuestionInput;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  topic: Prisma.TopicCreateNestedOneWithoutQuestionsInput;
  exam?: Prisma.ExamCreateNestedOneWithoutQuestionsInput;
}
