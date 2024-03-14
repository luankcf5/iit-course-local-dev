import { Prisma } from '@prisma/client';

export class FindCalendarDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.CalendarWhereUniqueInput;
  where?: Prisma.CalendarWhereInput;
  orderBy?: Prisma.CalendarOrderByWithRelationInput;
}
