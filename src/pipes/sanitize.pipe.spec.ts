import { SanitizeRegexPipe } from './sanitize.pipe';

describe('SanitizeRegexPipe', () => {
  const pipe = new SanitizeRegexPipe();

  it('should leave normal characers untouched', () => {
    const input = 'a normal search string - 1234567890 ~';
    expect(pipe.transform(input)).toStrictEqual(input);
  });

  test.each([
    ['\\'],
    ['.'],
    ['+'],
    ['*'],
    ['?'],
    ['^'],
    ['$'],
    ['['],
    [']'],
    ['('],
    [')'],
    ['{'],
    ['}'],
    ['/'],
    ["'"],
    ['#'],
    [':'],
    ['!'],
    ['='],
    ['|'],
  ])('should escape special regex characters [%s]', (input) => {
    expect(pipe.transform(input)).toStrictEqual(`\\${input}`);
  });
});
