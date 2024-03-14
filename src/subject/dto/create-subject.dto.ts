import { Prisma } from '@prisma/client';

export class CreateSubjectDto implements Prisma.SubjectCreateInput {
  name: string;
  description?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  grades?: Prisma.GradeCreateNestedManyWithoutSubjectsInput;
  topics?: Prisma.TopicCreateNestedManyWithoutSubjectInput;
}
