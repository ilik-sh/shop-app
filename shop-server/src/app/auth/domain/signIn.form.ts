import { IsEmail, IsStrongPassword, validate } from "class-validator";

export class SignInForm {
    @IsEmail()
    email: string

    password: string

    static from(form?: SignInForm) {
        const it = new SignInForm();
        it.email = form?.email;
        it.password = form?.password
        return it;
    }
    
    static async validate(form: SignInForm) {
        const errors = await validate(form);
        return errors.length ? errors : false;
      }
}