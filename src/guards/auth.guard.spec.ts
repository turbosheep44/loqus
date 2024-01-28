import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  let jwtService: JwtService;
  let ctx: ExecutionContext;
  let authHeader: string | undefined;

  beforeEach(() => {
    jwtService = createMock<JwtService>();
    ctx = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: authHeader,
          },
        }),
      }),
    });

    guard = new AuthGuard(jwtService);
  });

  test.each([
    undefined,
    'banana',
    'brewer matt.was.here',
    'Bearer invalid.token',
  ])('should throw when a malformed token is provided [token=%s]', (token) => {
    authHeader = token;
    jest.spyOn(jwtService, 'verify').mockImplementation(() => {
      throw 'invalid jwt';
    });

    expect(() => guard.canActivate(ctx)).toThrow(UnauthorizedException);
  });

  it('should return true when given a valid token', () => {
    authHeader = 'Bearer 1234';
    jest.spyOn(jwtService, 'verify').mockReturnValue({});

    expect(guard.canActivate(ctx)).toStrictEqual(true);
  });
});
