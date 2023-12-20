import { User } from "@prisma/client"

export class UserSessionDto {
    userId: string 

    email: string 

    password: string 

    static fromEntity(user: User) {
        const it = new UserSessionDto
        it.userId = user.id
        it.email = user.email
        it.password = user.password
        return it 
    }
}