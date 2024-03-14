import { Prisma } from '@prisma/client';

export class CreateSchoolDto implements Prisma.SchoolCreateInput {
  code: string;
  name: string;
  description?: string;
  logo?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  grades?: Prisma.GradeCreateNestedManyWithoutSchoolInput;
}
