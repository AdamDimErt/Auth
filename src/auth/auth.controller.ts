import { Request,Response } from 'express';
import { Body, Controller,Get,HttpCode,HttpStatus,Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Recaptcha } from '@nestlab/google-recaptcha';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Recaptcha()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  public async register(@Req()req:Request, @Body() dto:RegisterDto){


      return this.authService.register(req,dto)
  }
  @Recaptcha()
  @Post('login')
  public async login(@Req()req:Request,@Body() dto:LoginDto){
    return this.authService.login(req,dto)
  }  @Post('logout')
  public async logout(@Req()req:Request,@Res({passthrough:true})res:Response){
    return this.authService.logout(req,res)
  }
}
