import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SERVICES } from 'src/config/services';
import { Request } from 'express';
import { RequestWithId } from 'src/common/interceptors/logging/logging.interceptor';

export interface User {
  id: number;
  name: string;
}

@Injectable()
export class ProxyService {
  constructor(private readonly httpService: HttpService) {}

  async forward(req: RequestWithId) {
    const path = req.path.replace('/api/', '');

    const [service] = path.split('/');

    const config = SERVICES[service as keyof typeof SERVICES];

    if (!config) {
      throw new NotFoundException(`Service ${service} not found`);
    }

    const targetUrl = [config, path].filter(Boolean).join('/');

    const headers = {
      ...req.headers,
      'x-user-id': req.user?.sub,
      'x-user-email': req.user?.email,
    };

    delete headers.host;
    delete headers.connection;
    delete headers['if-none-match'];

    const response = await firstValueFrom(
      this.httpService.request({
        method: req.method,
        url: targetUrl,
        data: req.body as unknown,
        headers,
      }),
    );

    return response.data as unknown;
  }
}
