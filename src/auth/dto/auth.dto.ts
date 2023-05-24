import { IsEmail, IsNotEmpty, IsString } from "class-validator";

// Purpose: DTO for AuthController
export class AuthDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}