import { BadRequestException } from '@nestjs/common';
import { ParseIdPipe } from './id.pipe';

describe('ParseIdPipe', () => {
  const pipe = new ParseIdPipe();

  it('should return the input when it is valid', () => {
    const input = '65b4ece0462ac52ab0802688';
    expect(pipe.transform(input)).toEqual(input);
  });

  test.each([['aaaaaaaaaaaaaaaaaaaaaaa'], ['#?'], ['definitely not an id']])(
    'should throw on invalid ID [%s]',
    (value) => {
      expect(() => pipe.transform(value)).toThrow(BadRequestException);
    },
  );
});
