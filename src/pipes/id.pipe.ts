import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
import { ID } from 'src/post/post.dto';

@Injectable()
export class ParseIdPipe implements PipeTransform<string, ID> {
  public transform(value: string): ID {
    // if we wanted to *fully* segregate our presentation and service layers
    // we would implement a custom check here, but i think using the ID type
    // is an acceptable level of separation, at least for a demo project
    if (!Types.ObjectId.isValid(value))
      throw new BadRequestException('invalid object identifier');

    return value;
  }
}
