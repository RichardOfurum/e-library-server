import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    @IsString()
    readonly title: string;

    @IsString()
    @IsOptional()
    readonly author: string;

    @IsString()
    readonly description: string;

    @IsString()
    @IsOptional()
    readonly publisher: string;

    @IsOptional()
    readonly publishDate: Date;

    @IsNumber()
    readonly pages: number;

    @IsString()
    @IsOptional()
    readonly image: string;

    @IsString()
    @IsOptional()
    readonly url: string;

    @IsString()
    @IsArray()
    readonly categories: string[];
}
