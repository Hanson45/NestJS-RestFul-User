import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SameUserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authUserId = req.user.id;
    const requestUserId = Number(req.params.id);

    return authUserId === requestUserId;
  }
}

@Injectable()
export class MessageGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authenticatedUserId = req.user.id;
    const messageId = req.body.messageId;

    const isUserAuthorized = authenticatedUserId === messageId;

    return isUserAuthorized;
  }
}
