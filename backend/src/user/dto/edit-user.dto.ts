import { IsEmail, IsStrongPassword } from "class-validator";

export class EditUserDto {
  @IsStrongPassword({
    minLength: 8,
  })
  passWord: string;

  @IsEmail()
  email: string;
}
