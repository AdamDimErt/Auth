import { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { ProviderService } from '../provider/provider.service';


@Injectable()
export class CheckAuthProviderGuard implements CanActivate {
  constructor(private readonly providerService: ProviderService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest() as Request;
    const provider = request.params.provider;

    const providerInstance = this.providerService.findByService(provider);

    if (!providerInstance) {
      throw new NotFoundException(
        `Провайдер "${provider}" не найден. Пожалуйста, проверьте правильность введенных данных.`
      );
    }

    return true;
  }
}
