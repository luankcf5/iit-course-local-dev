import { PartialType } from '@nestjs/mapped-types';
import { CreateBookseryDto } from './create-booksery.dto';

export class UpdateBookseryDto extends PartialType(CreateBookseryDto) {}
