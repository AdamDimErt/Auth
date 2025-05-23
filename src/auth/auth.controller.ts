import { Response,Request } from 'express';
import { BadRequestException, Body, Controller,Get,HttpCode,HttpStatus,Param,Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { CheckAuthProviderGuard } from './guards/provider.guard';
import { ProviderService } from './provider/provider.service';
import { ConfigService } from '@nestjs/config';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly providerService:ProviderService,
    private readonly configService:ConfigService
  ) {}

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
  } 
  
  @Get('oauth/callback/:provider')
  @UseGuards(CheckAuthProviderGuard)
  public async callback (
    @Req()req:Request, 
    @Res({passthrough:true}) res:Response,
    @Query('code') code:string,
     @Param('provider') provider:string
){
    if(!code){
      throw new BadRequestException( 'не был предоставлен код авторизации')
    }

    await this.authService.extractProfileFromCode(req,provider,code)

              // переадризация после успешной регстрации потом поменять 
    return res.redirect(`${this.configService.getOrThrow<string>('ALLOWED_ORIGIN')}/dashboard/settings`)
  }


  @UseGuards(CheckAuthProviderGuard)
  @Get('oauth/connect/:provider')
  @HttpCode(HttpStatus.OK)
  public async connect(@Param('provider') provider:string){
    const providerInstance = this.providerService.findByService(provider)


    return {
      url:providerInstance.getAuthUrl()
    }
  }

  
  
  @Post('logout')
  public async logout(@Req()req:Request,@Res({passthrough:true})res:Response){
    return this.authService.logout(req,res)
  }


}
