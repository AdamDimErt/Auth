import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '@/user/user.service';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRecaptchaConfig } from '@/config/recaptcha.config';
import { ProviderModule } from './provider/provider.module';
import { getProviderConfig } from '@/config/provider.config';

@Module({
  
  imports: [
    ProviderModule.registerAsync({
      imports:[ConfigModule],
      useFactory:getProviderConfig,
      inject:[ConfigService]
    }),
    GoogleRecaptchaModule.forRootAsync({
    imports: [ConfigModule],
    useFactory:getRecaptchaConfig,
    inject:[ConfigService]
  })],
  controllers: [AuthController],
  providers: [AuthService,UserService]
})
export class AuthModule {}
