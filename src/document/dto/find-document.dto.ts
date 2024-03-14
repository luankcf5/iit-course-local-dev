import { Prisma } from '@prisma/client';

export class FindDocumentDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.DocumentWhereUniqueInput;
  where?: Prisma.DocumentWhereInput;
  orderBy?: Prisma.DocumentOrderByWithRelationInput;
}
