import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EmptyBodyPipe implements PipeTransform {
  transform(value: any) {
    if (!value || !Object.keys(value).length) {
      throw new BadRequestException('The body cannot be empty');
    }
    return value;
  }
}