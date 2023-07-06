import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers["user-id"];

    if (!userId) {
      throw new UnauthorizedException(
        "You must be authenticated to access this resource"
      );
    }

    return true;
  }
}
