import {
  // MiddlewareConsumer,
  Module,
  // NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { ProxyModule } from './modules/proxy/proxy.module';
import { JwtModule } from '@nestjs/jwt';
// import { userProxy } from './common/middleware/proxy.middleware';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ProxyModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
})
export class AppModule {}
// @Module({})

/*
Essa forma de utilizar o AppModule é para quando for utilizar middleware
*/
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(userProxy)
//       .forRoutes({ path: 'api/users', method: RequestMethod.ALL });
//   }
// }
