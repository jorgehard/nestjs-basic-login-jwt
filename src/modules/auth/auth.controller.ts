/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from './auth.service';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthLoginDTO) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post('forget')
  async forget(@Body() body: AuthForgetDTO) {
    return this.authService.forget(body.email);
  }

  @Post('reset')
  async reset(@Body() body: AuthResetDTO) {
    return this.authService.reset(body.password, body.token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user) {
    return {user};
  }
}
