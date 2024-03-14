import { Prisma } from '@prisma/client';

export class FindTopicDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.TopicWhereUniqueInput;
  where?: Prisma.TopicWhereInput;
  orderBy?: Prisma.TopicOrderByWithRelationInput;
}
