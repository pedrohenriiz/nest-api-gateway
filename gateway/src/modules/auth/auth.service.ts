import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { SERVICES } from 'src/config/services';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async login(body: LoginDto) {
    const response = await firstValueFrom(
      this.httpService.post<string>(`${SERVICES.auth}/auth/login`, body),
    );

    return response.data;
  }
}
