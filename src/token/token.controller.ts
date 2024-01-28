import { Controller, Get } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('token')
export class TokenController {
  /**
   * for a real application, if i had to develop a fleet of microservices i would
   * create a central authorization sever which authenticates users and generates
   * signed tokens (basically i would use OAuth 2.0)
   *
   * for this demo, i am putting this endpoint here for convenience so that you can
   * get a token which is valid for 1 hour
   */

  constructor(private jwtService: JwtService) {}

  @Get()
  token(): { access_token: string } {
    return {
      access_token: this.jwtService.sign({
        sub: '999999',
        username: 'matthew.axisa',
      }),
    };
  }
}
