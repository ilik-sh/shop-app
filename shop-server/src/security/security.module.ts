import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "prisma/prisma.module";
import { SecurityService } from "./security.service";
import { AccessTokenStrategy } from "./accessToken.strategy";
import { UserRepository } from "domain/repositories/user.repository";
import { AccessTokenGuard } from "./guards/accessToken.guard";
import { RefreshTokenGuard } from "./guards/refreshToken.guard";
import { RefreshTokenStrategy } from "./refreshToken.strategy";


@Module ({
    imports: [
        PrismaModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        ConfigModule,
        JwtModule.register({})
    ],
    providers: [
        SecurityService,
        AccessTokenStrategy,
        RefreshTokenStrategy,
        UserRepository,
        AccessTokenGuard,
        RefreshTokenGuard
    ],
    exports: [SecurityService, RefreshTokenGuard, AccessTokenGuard]
})
export class SecurityModule {}