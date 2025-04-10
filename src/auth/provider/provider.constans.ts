import { FactoryProvider, ModuleMetadata } from "@nestjs/common"
import { BaseOAuthService } from "./services/base-oauth.service"

export const ProviderOptionsSymbol = Symbol()


export type TypeOption = {
    baseUrl:string
    services:BaseOAuthService[]
}

export type  TypeAsyncOptions =  Pick<ModuleMetadata , 'imports'> & 
Pick<FactoryProvider<TypeOption>,'useFactory' | 'inject'>