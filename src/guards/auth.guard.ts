import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private whitelist: RegExp[],
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (this.isWhitelisted(request)) return true;

    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    try {
      this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private isWhitelisted(request: Request): boolean {
    const path = request.path;
    return this.whitelist.some((allowed) => {
      const result = allowed.exec(path);
      return result != null && result[0].length == path.length;
    });
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
