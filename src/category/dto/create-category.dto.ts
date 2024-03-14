import { Prisma } from '@prisma/client';

export class CreateCategoryDto implements Prisma.CategoryCreateInput {
  name: string;
  description?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  topics?: Prisma.TopicCreateNestedManyWithoutCategoriesInput;
  documents?: Prisma.DocumentCreateNestedManyWithoutCategoryInput;
}
