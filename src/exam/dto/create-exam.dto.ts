import { Prisma } from '@prisma/client';

export class CreateExamDto implements Prisma.ExamCreateInput {
  code: string;
  name: string;
  duration: number;
  type: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  topic: Prisma.TopicCreateNestedOneWithoutExamsInput;
  questions?: Prisma.QuestionCreateNestedManyWithoutExamInput;
}
