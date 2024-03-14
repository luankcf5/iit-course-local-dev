import { Prisma } from '@prisma/client';

export class CreateTopicDto implements Prisma.TopicCreateInput {
  name: string;
  description?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  grades?: Prisma.GradeCreateNestedManyWithoutTopicsInput;
  subject: Prisma.SubjectCreateNestedOneWithoutTopicsInput;
  categories?: Prisma.CategoryCreateNestedManyWithoutTopicsInput;
  documents?: Prisma.DocumentCreateNestedManyWithoutTopicInput;
}
