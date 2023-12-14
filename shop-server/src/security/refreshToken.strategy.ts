import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import {Strategy, ExtractJwt} from 'passport-jwt'
import {ConfigService} from '@nestjs/config'
import { UserRepository } from "domain/repositories/user.repository";
import { User } from "@prisma/client";
import { UserSessionDto } from "domain/dtos/userSession.dto";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor (
        private readonly config: ConfigService,
        private readonly userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('SECRET_REFRESH'),
            passReqToCallback: true
        })   
    }

    async validate(req: Request, payload: UserSessionDto) {
        const refreshToken = req.headers['authorization'].replace('Bearer', '').trim()
        const foundUser = await this.userRepository.findByEmail(payload.email)
        if (!foundUser) {
            return false
        }
        return {foundUser, refreshToken}
    }
}