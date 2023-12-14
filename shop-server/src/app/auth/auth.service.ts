import { Injectable } from '@nestjs/common';
import { UserSessionDto } from 'domain/dtos/userSession.dto';
import { UserRepository } from 'domain/repositories/user.repository';
import { SecurityService } from 'security/security.service';
import { User } from '@prisma/client';
import { CreateUserDto } from 'domain/dtos/user.dto';

@Injectable()
export class AuthService {
    constructor (
        private readonly securityService: SecurityService,
        private readonly userRepository: UserRepository
    ) {}

    async findUserByEmail(userCredentials: Pick<User, "email">) {
        return await this.userRepository.findByEmail(userCredentials.email)
    }

    async findUserByEmailAndPassword(userCredentials: Pick<User, "email" | "password">) {
        const hashedPassword = await this.securityService.hashData(userCredentials.password)
        return await this.userRepository.findByEmailAndPassword(userCredentials.email, hashedPassword)
    }

    async findByRefreshToken(userCredentials: Pick<User, "refreshToken">) {
        return await this.userRepository.findByRefreshToken(userCredentials.refreshToken)
    }

    async createNewUser(user: Pick<User, "username" | "password" | "email">) {
        const password = await this.securityService.hashData(user.password)

        return this.userRepository.createNewUser({password, ...user})
    }

    async refreshTokens(userSession: UserSessionDto) {
        await this.userRepository.removeRefreshToken(userSession.userId)
        return await this.securityService.generateTokens(userSession)
    }

    async authenticate(userSession: UserSessionDto) {
        return await this.securityService.generateTokens(userSession)
    }

    async signOut(userCredentials: Pick<User, "id">) {
        return await this.userRepository.removeRefreshToken(userCredentials.id)
    }

    async comparePasswords(password: string, existingPassword: string) {
        const hashedPassword = await this.securityService.hashData(password)
        return this.securityService.compareData(hashedPassword, existingPassword)
    }

    async changePassword(password: string, userCredentials: Pick<User, "id">) {
        return await this.userRepository.changePassword(userCredentials.id, password)
    }
}
