import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { map } from "rxjs";

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(map((value) => this.removePassword(value)));
  }

  private removePassword(unknown: unknown): unknown {
    const isObject = typeof unknown === "object";
    const isNull = unknown === null;

    if (!isObject || isNull) {
      return unknown;
    }

    if (Array.isArray(unknown)) {
      return unknown.map((value) => this.removePassword(value));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = unknown as Record<string, unknown>;

    const withoutPassword = Object.entries(rest).reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key]: this.removePassword(value),
      }),
      {}
    );

    return withoutPassword;
  }
}
