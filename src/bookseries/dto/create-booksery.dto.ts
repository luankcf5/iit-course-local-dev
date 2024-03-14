import { Prisma } from '@prisma/client';

export class CreateBookseryDto implements Prisma.BookSeriesCreateInput {
  name: string;
  description?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  documents?: Prisma.DocumentCreateNestedManyWithoutBookSeriesInput;
}
