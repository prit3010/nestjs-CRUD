import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createBookmarkDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    // the ? means optional for typescript while the isOptional() means optional for class-validator
    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsNotEmpty()
    link: string;

}