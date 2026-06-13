import { All, Controller, Req, UseGuards } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { JwtGuard } from 'src/common/guards/jwt/jwt.guard';
import type { RequestWithId } from 'src/common/interceptors/logging/logging.interceptor';

@Controller('api')
@UseGuards(JwtGuard)
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All(['*'])
  async proxy(@Req() req: RequestWithId): Promise<unknown> {
    return this.proxyService.forward(req);
  }
}
