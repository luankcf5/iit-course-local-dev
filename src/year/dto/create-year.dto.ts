import { Prisma } from '@prisma/client';

export class CreateYearDto implements Prisma.YearCreateInput {
  start: string | Date;
  end: string | Date;
  description?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  classes?: Prisma.ClassCreateNestedManyWithoutYearInput;
}
