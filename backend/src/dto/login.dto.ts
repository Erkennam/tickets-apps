import {IsEnum,IsEmail,IsNumber,IsNotEmpty,IsString,MinLength} from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsEmail({},{message: 'не валидный email'}) 
    readonly email: String;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: String;
}