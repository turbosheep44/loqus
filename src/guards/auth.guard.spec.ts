import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  let jwtService: JwtService;
  let ctx: ExecutionContext;
  let authHeader: string | undefined;
  let path: string;

  beforeEach(() => {
    jwtService = createMock<JwtService>();
    ctx = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          path: path,
          headers: {
            authorization: authHeader,
          },
        }),
      }),
    });
    const whitelist = [/\/ok/, /\/ok\/.+/, /\/whitelist/];
    path = '';
    authHeader = '';

    guard = new AuthGuard(jwtService, whitelist);
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

  test.each(['/ok', '/whitelist', '/ok/abc'])(
    'should return true on whitelisted paths [path=%s]',
    (url) => {
      path = url;
      expect(guard.canActivate(ctx)).toStrictEqual(true);
    },
  );

  test.each(['/ok/', '/blacklist', '/'])(
    'should throw on paths which are not on the whitelist [path=%s]',
    (url) => {
      path = url;
      expect(() => guard.canActivate(ctx)).toThrow(UnauthorizedException);
    },
  );
});
