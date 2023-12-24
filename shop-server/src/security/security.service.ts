import { Injectable } from "@nestjs/common";
import {JwtService} from "@nestjs/jwt"
import * as crypto from "crypto"
import { UserSessionDto } from "domain/dtos/userSession.dto";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class SecurityService {
    constructor (
        private readonly service: JwtService,
        private readonly configService: ConfigService
        ) {}

    async generateTokens(payload: UserSessionDto) {
        const accessToken = await this.service.signAsync({payload}, {
            secret: this.configService.get('SECRET_ACCESS'),
            expiresIn: '15s'
        })
        const refreshToken = await this.service.signAsync({payload}, {
            secret: this.configService.get('SECRET_REFRESH'),
            expiresIn: '7d'
        })

        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }

    async hashData (data: string) {
        const hash = crypto.createHash('MD5')
        return hash.update(data).digest('hex')
    }

    async compareData (dataToCompare: string, existingData: string) {
        return (await this.hashData(dataToCompare)) === existingData
    }
}