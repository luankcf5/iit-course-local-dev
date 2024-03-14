import { Prisma } from '@prisma/client';

export class FindTranscriptDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.TranscriptWhereUniqueInput;
  where?: Prisma.TranscriptWhereInput;
  orderBy?: Prisma.TranscriptOrderByWithRelationInput;
}
