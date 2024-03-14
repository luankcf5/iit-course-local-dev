import { Prisma } from '@prisma/client';

export class CreateTranscriptDto implements Prisma.TranscriptCreateInput {
  t1S1?: number;
  t1S2?: number;
  t1S3?: number;
  t1S4?: number;
  t1S5?: number;
  t1Mid?: number;
  t1Final?: number;
  t1Overall?: number;
  t2S1?: number;
  t2S2?: number;
  t2S3?: number;
  t2S4?: number;
  t2S5?: number;
  t2Mid?: number;
  t2Final?: number;
  t2Overall?: number;
  finalp1?: number;
  finalp2?: number;
  final?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  student: Prisma.StudentCreateNestedOneWithoutTranscriptsInput;
  class: Prisma.ClassCreateNestedOneWithoutTranscriptsInput;
  subject: Prisma.SubjectCreateNestedOneWithoutTranscriptsInput;
}
