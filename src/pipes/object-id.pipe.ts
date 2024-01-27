import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectId implements PipeTransform<string, Types.ObjectId> {
  public transform(value: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(value))
      throw new BadRequestException('invalid object identifier');

    return Types.ObjectId.createFromHexString(value);
  }
}
