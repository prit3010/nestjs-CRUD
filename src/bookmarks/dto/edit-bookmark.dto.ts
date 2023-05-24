import {IsOptional, IsString } from 'class-validator';

export class editBookmarkDTO {
    @IsString()
    @IsOptional()
    title?: string;

    // the ? means optional for typescript while the isOptional() means optional for class-validator
    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    link?: string;

}