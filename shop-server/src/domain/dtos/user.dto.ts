import { IsEmail, IsString, IsStrongPassword, IsUUID } from "class-validator";
import { UUIDDto } from "./uuid.dto";


export class CreateUserDto extends UUIDDto {
    @IsEmail()
    email: string

    @IsString()
    username: string 

    @IsStrongPassword()
    password: string 
}