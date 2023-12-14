import { PrismaService } from "prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class UserRepository {
    constructor (private readonly service: PrismaService) {}

    async findByEmail(email: string) {
        return this.service.user.findFirst({where: {
            email: email
        }})
    } 

    async findByEmailAndPassword(email: string, password: string) {
        return this.service.user.findFirst({where: {
            email: email,
            password: password
        }})
    } 

    async findById(id: string) {
        return await this.service.user.findFirst({
            where: {
                id: id
            }
        })
    }

    async findByRefreshToken(refreshToken: string) {
        return await this.service.user.findFirst({
            where: {
                refreshToken: refreshToken
            }
        })
    }


    async changePassword(userId: string, password: string) {
        return this.service.user.update({
            where: {
                id: userId
            },
            data: {
                password: password
            },
        })
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        return this.service.user.update({
            where: {
                id: userId
            },
            data: {
                refreshToken: refreshToken
            }
        })
    }

    async removeRefreshToken(userId: string) {
        return this.service.user.update({
            where: {
                id: userId
            },
            data: {
                refreshToken: null
            }
        })
    }


    async createNewUser(user: Pick<
        User, 
        | 'email'
        | 'password'
        | 'username'
        >) {
            return this.service.user.create({
                data: {
                    email: user.email,
                    password: user.password,
                    username: user.username,
                    cart: {
                        create: {
                            total: 0
                        }
                    }
                },
                include: {
                    cart: true
                }
            })
        }
}