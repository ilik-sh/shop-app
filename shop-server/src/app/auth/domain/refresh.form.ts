import { User } from "@prisma/client";
import { validate } from "class-validator";

export class RefreshForm {
    userId: string 

    refreshToken: string

    static from(form?: RefreshForm) {
        const it = new RefreshForm
        it.userId = form.userId
        it.refreshToken = form.refreshToken
        return it
    }

    static async validate(form: RefreshForm) {
        const errors = await validate(form)
        return errors.length ? errors : false
    }
}