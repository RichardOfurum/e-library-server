import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookDto {

    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsOptional()
    readonly author: string;

    @IsString()
    @IsNotEmpty()
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
    @IsNotEmpty()
    readonly category: string;
}
