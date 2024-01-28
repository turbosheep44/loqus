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
  let method: string;

  beforeEach(() => {
    jwtService = createMock<JwtService>();
    ctx = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          method,
          path,
          headers: {
            authorization: authHeader,
          },
        }),
      }),
    });

    path = '';
    method = 'GET';
    authHeader = '';

    guard = new AuthGuard(jwtService, [
      ['GET', /\/ok/],
      ['GET', /\/ok\/.+/],
      ['POST', /\/whitelist/],
    ]);
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

  test.each([
    ['GET', '/ok'],
    ['GET', '/ok/abc'],
    ['POST', '/whitelist'],
  ])(
    'should return true on whitelisted paths [method=%s, path=%s]',
    (requestMethod, requestPath) => {
      method = requestMethod;
      path = requestPath;
      expect(guard.canActivate(ctx)).toStrictEqual(true);
    },
  );

  test.each([
    ['PUT', '/ok'],
    ['DELETE', '/ok/123'],
    ['GET', '/blacklist'],
    ['DELETE', '/whitelist'],
  ])(
    'should throw on paths which are not on the whitelist [method=%s, path=%s]',
    (requestMethod, requestPath) => {
      method = requestMethod;
      path = requestPath;
      expect(() => guard.canActivate(ctx)).toThrow(UnauthorizedException);
    },
  );
});
