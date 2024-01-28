import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenController } from './token.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      // this would be handled by the OAuth 2.0 server but this should
      // definitely be loaded from a secrets vault
      secret: 'not much of a secret, eh?',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [TokenController],
})
export class TokenModule {}
