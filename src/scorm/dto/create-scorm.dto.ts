import { Prisma } from '@prisma/client';

export class CreateScormDto implements Prisma.ScormCreateInput {
  name: string;
  file: string;
}
