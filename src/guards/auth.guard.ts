import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly log = new Logger(AuthGuard.name);

  constructor(
    private jwtService: JwtService,
    private whitelist: [string, RegExp][],
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (this.isWhitelisted(request)) return true;

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      this.log.warn(
        `[${request.method} ${request.path}] unauthorized request; no token found`,
      );
      throw new UnauthorizedException();
    }

    try {
      this.jwtService.verify(token);
    } catch {
      this.log.warn(
        `[${request.method} ${request.path}] unauthorized request; invalid token`,
      );
      throw new UnauthorizedException();
    }

    return true;
  }

  private isWhitelisted(request: Request): boolean {
    const path = request.path;
    const method = request.method;

    return this.whitelist.some((allowed) => {
      if (allowed[0] != method) return false;

      const result = allowed[1].exec(path);
      return result != null && result[0].length == path.length;
    });
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
