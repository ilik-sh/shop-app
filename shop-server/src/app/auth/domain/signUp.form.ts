import { IsEmail, IsStrongPassword, validate } from "class-validator";

export class SignUpForm {
    @IsEmail()
    email: string

    password: string 

    username: string 

    static from(form?: SignUpForm) {
        const it = new SignUpForm();
        it.email = form?.email;
        it.password = form?.password
        it.username = form?.username
        return it;
      }

    static async validate(form: SignUpForm) {
        const errors = await validate(form);
        return errors.length ? errors : false;
      }
}