import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import {Strategy, ExtractJwt} from 'passport-jwt'
import {ConfigService} from '@nestjs/config'
import { UserRepository } from "domain/repositories/user.repository";
import { User } from "@prisma/client";
import { UserSessionDto } from "domain/dtos/userSession.dto";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor (
        private readonly config: ConfigService,
        private readonly userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('SECRET_ACCESS')
        })   
    }

    async validate(payload: any) {
        const data = payload.payload
        const foundUser = await this.userRepository.findByEmail(data.email)
        if (!foundUser) {
            return false
        }
        return foundUser
    }
}