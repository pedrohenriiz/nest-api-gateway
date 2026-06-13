import { Controller, Get, Headers } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('users')
  findAll(@Headers('x-user-id') userId: string) {
    console.log('userId', userId);
    // throw new NotFoundException();

    return [
      {
        id: 1,
        name: 'Pedro Henrique 2',
      },
    ];
  }
}
