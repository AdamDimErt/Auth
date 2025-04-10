import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from 'process';
import { IS_DEV_ENV } from './libs/common/utils/is-dev.utils';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProviderModule } from './auth/provider/provider.module';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { ColorModule } from './color/color.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile:!IS_DEV_ENV,
      isGlobal: true
    }),
    ProductModule,
    PrismaModule,
    AuthModule,
    UserModule,
    ProviderModule,
    ProductModule,
    BrandModule,
    ColorModule,
    CategoryModule,
    CartModule
  ],
})
export class AppModule {}
