import { Injectable, PipeTransform } from '@nestjs/common';

/**
 * sanitize a string value by escaping every regex special character
 */
@Injectable()
export class SanitizeRegexPipe implements PipeTransform<string, string> {
  public transform(value: string): string {
    if (!value) return value;

    return value.replace(
      /[\\\.\+\*\?\^\$\[\]\(\)\{\}\/\'\#\:\!\=\|]/gi,
      '\\$&',
    );
  }
}
