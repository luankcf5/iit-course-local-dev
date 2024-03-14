import { Prisma } from '@prisma/client';

export class CreateStudentDto implements Prisma.StudentCreateInput {
  studentId: string;
  name: string;
  gender: boolean;
  dob: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  class: Prisma.ClassCreateNestedOneWithoutStudentsInput;
  transcripts?: Prisma.TranscriptCreateNestedManyWithoutStudentInput;
}
