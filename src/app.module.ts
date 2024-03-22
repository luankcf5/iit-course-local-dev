import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolModule } from './school/school.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GradeModule } from './grade/grade.module';
import { YearModule } from './year/year.module';
import { SubjectModule } from './subject/subject.module';
import { ClassModule } from './class/class.module';
import { CategoryModule } from './category/category.module';
import { TopicModule } from './topic/topic.module';
import { BookseriesModule } from './bookseries/bookseries.module';
import { DocumentModule } from './document/document.module';
import { PrismaModule } from 'nestjs-prisma';
import { StudentModule } from './student/student.module';
import { QuestionModule } from './question/question.module';
import { ExamModule } from './exam/exam.module';
import { TranscriptModule } from './transcript/transcript.module';
import { CalendarModule } from './calendar/calendar.module';
import { AnswerModule } from './answer/answer.module';
import { SheetModule } from './sheet/sheet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    SchoolModule,
    GradeModule,
    YearModule,
    SubjectModule,
    ClassModule,
    CategoryModule,
    TopicModule,
    BookseriesModule,
    DocumentModule,
    StudentModule,
    AnswerModule,
    QuestionModule,
    ExamModule,
    TranscriptModule,
    CalendarModule,
    SheetModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
