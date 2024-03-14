import { Prisma } from '@prisma/client';

export class CreateDocumentDto implements Prisma.DocumentCreateInput {
  description?: string;
  filename: string;
  file: string;
  default?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  topic: Prisma.TopicCreateNestedOneWithoutDocumentsInput;
  category: Prisma.CategoryCreateNestedOneWithoutDocumentsInput;
  bookSeries: Prisma.BookSeriesCreateNestedOneWithoutDocumentsInput;
}
