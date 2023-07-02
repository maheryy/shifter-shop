import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";

@Injectable()
export class NotEmptyBodyPipe implements PipeTransform {
  transform(value: unknown, { type }: ArgumentMetadata) {
    if (type !== "body") {
      return value;
    }

    if (!value || !Object.keys(value).length) {
      throw new BadRequestException("The body cannot be empty");
    }

    return value;
  }
}
