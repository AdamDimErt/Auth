import { TypeOption } from '@/auth/provider/provider.constans';
import { GoogleProvider } from '@/auth/provider/services/google.provider';
import { ConfigService } from '@nestjs/config';
export const getProviderConfig = async (configService:ConfigService):Promise<TypeOption> => ({
    baseUrl:configService.getOrThrow<string>('APPLICATION_URL'),
    services:[
        new GoogleProvider({
            client_id:configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
            client_secret:configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
            scopes:['email','profile']
        })
    ]
});