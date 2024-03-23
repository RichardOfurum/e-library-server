import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    readonly username: string;

    @IsString()
    @IsOptional()
    readonly password: string;

    @IsOptional()
    @IsBoolean()
    readonly isAdmin: boolean;
}
