import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SecurityModule } from 'security/security.module';
import { UserRepository } from 'domain/repositories/user.repository';
import { SecurityService } from 'security/security.service';
import { PrismaModule } from 'prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PrismaModule, 
    SecurityModule,
    PassportModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository
  ],
})
export class AuthModule {}
