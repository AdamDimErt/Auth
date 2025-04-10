import { DynamicModule, Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderOptionsSymbol, TypeAsyncOptions, TypeOption } from './provider.constans';


@Module({

})
export class ProviderModule {

  public static register(options:TypeOption):DynamicModule{
    return{
      module:ProviderModule,
      providers:[
        {
          useValue:options.services,
          provide:ProviderOptionsSymbol
        },
        ProviderService
      ],
      exports:[ProviderService]
    }
  }

  public static registerAsync(options:TypeAsyncOptions):DynamicModule{
    return{
      module:ProviderModule,
      imports:options.imports,
      providers:[
        {
          useFactory:options.useFactory,
          provide:ProviderOptionsSymbol,
          inject:options.inject
        },
        ProviderService
      ],
      exports:[ProviderService]
    }
  }
}
