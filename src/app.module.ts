import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from 'process';
import { IS_DEV_ENV } from './libs/common/utils/is-dev.utils';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile:!IS_DEV_ENV,
      isGlobal: true
    }),
    PrismaModule,
    AuthModule,
    UserModule
  ],
})
export class AppModule {}