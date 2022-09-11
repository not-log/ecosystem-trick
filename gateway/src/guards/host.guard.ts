import { ResponseErrorDTO } from "@common/dto";
import { CanActivate, ExecutionContext, ForbiddenException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

const authorizedHosts = process.env.TRUSTED_HOSTS?.split(";") || [];

@Injectable()
export class HostGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (authorizedHosts.includes(request.hostname)) {
      return true;
    }

    const responseError: ResponseErrorDTO = {
      status: HttpStatus.FORBIDDEN,
      error: "Request forbidden",
    };
    throw new ForbiddenException(responseError);
  }
}
