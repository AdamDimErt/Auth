import { Injectable,Inject, OnModuleInit } from '@nestjs/common';
import { ProviderOptionsSymbol, TypeOption } from './provider.constans';
import { BaseOAuthService } from './services/base-oauth.service';

@Injectable()
export class ProviderService implements OnModuleInit {
    public constructor(@Inject(ProviderOptionsSymbol) private readonly options:TypeOption){
        
    }
    public onModuleInit() {
        for (const provider of this.options.services) {
            provider.baseUrl = this.options.baseUrl
        }
    }

    public findByService(service:string):BaseOAuthService|null{
        return this.options.services.find(s =>s.name === service) ?? null
    }
}
