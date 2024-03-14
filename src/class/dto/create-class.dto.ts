import { Prisma } from '@prisma/client';

export class CreateClassDto implements Prisma.ClassCreateInput {
  name: string;
  year: Prisma.YearCreateNestedOneWithoutClassesInput;
  grade: Prisma.GradeCreateNestedOneWithoutClassesInput;
  students?: Prisma.StudentCreateNestedManyWithoutClassInput;
}
