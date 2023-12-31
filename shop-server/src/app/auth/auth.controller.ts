import { BadRequestException, Body, Controller, HttpCode, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSessionDto } from 'domain/dtos/userSession.dto';
import { AccessTokenGuard } from 'security/guards/accessToken.guard';
import { SignInForm } from './domain/signIn.form';
import { ApiInternalException } from 'exceptions/apiInternalException';
import { ErrorCodes } from 'enums/errorCode.enum';
import { RefreshTokenGuard } from 'security/guards/refreshToken.guard';
import { SignUpForm } from './domain/signUp.form';
import { ApiRequestException } from 'exceptions/apiRequestException';
import { CurrentUser } from 'decorators/currentUser.decorator';
import { RefreshForm } from './domain/refresh.form';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('/signup')
  async signUp(@Body() body: SignUpForm) {
    const form = SignUpForm.from(body) 
    const errors = await SignUpForm.validate(form)
    if (errors) {
      throw new ApiRequestException(ErrorCodes.InvalidForm, errors)
    }

    const existingUser = await this.authService.findUserByEmail(form) 
    if (existingUser) {
      throw new ApiInternalException(ErrorCodes.UserAlreadyExists)
    }

    const user = await this.authService.createNewUser(form)
    if (!user) {
      throw new ApiInternalException(ErrorCodes.UserCreationFailed)
    }

    return user
  }

  @HttpCode(200)
  @Post('/signin')
  async signIn(@Body() body: SignInForm) {
    const form = SignInForm.from(body)
    const errors = await SignInForm.validate(form)
    if (errors)  {
      throw new ApiRequestException(ErrorCodes.InvalidForm, errors)
    }

    const existingUser = await this.authService.findUserByEmailAndPassword(form)
    if (!existingUser) {
      throw new ApiInternalException(ErrorCodes.UserDoesNotExist)
    }

    const session = UserSessionDto.fromEntity(existingUser)
    return await this.authService.authenticate(session)
  }

  @HttpCode(200)
  @UseGuards(AccessTokenGuard)
  @Get('/signout')
  async signOut(@CurrentUser() user: UserSessionDto) {
    const existingUser = await this.authService.findUserById(user.userId)
    if (!existingUser) {
      throw new ApiInternalException(ErrorCodes.UserDoesNotExist)
    }

    return this.authService.signOut(existingUser)
  }

  @Get('/refresh')
  @UseGuards(RefreshTokenGuard)
  async refreshToken(@CurrentUser() user: User) {
    const existingUserWithToken = await this.authService.findUserById(user.id)
    if (!existingUserWithToken) {
      throw new ApiInternalException(ErrorCodes.UserDoesNotExist)
    }

    const session = UserSessionDto.fromEntity(existingUserWithToken)

    return await this.authService.refreshTokens(session)
  }
}
