import { Prisma } from '@prisma/client';

export class CreateGradeDto implements Prisma.GradeCreateInput {
  label: number;
  description?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  school: Prisma.SchoolCreateNestedOneWithoutGradesInput;
  classes?: Prisma.ClassCreateNestedManyWithoutGradeInput;
  subjects?: Prisma.SubjectCreateNestedManyWithoutGradesInput;
}
