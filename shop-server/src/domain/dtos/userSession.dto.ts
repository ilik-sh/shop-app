import { User } from "@prisma/client"

export class UserSessionDto {
    userId: string 

    cartId: string 

    email: string 

    password: string 

    static fromEntity(user: User) {
        const it = new UserSessionDto
        it.userId = user.id
        it.cartId = user.cartId
        it.email = user.email
        it.password = user.password
        return it 
    }
}