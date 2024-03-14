import { Prisma } from '@prisma/client';

export class CreateCalendarDto implements Prisma.CalendarCreateInput {
  color: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  allDay: boolean;
  class: Prisma.ClassCreateNestedOneWithoutCalendarInput;
  subject: Prisma.SubjectCreateNestedOneWithoutCalendarInput;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
