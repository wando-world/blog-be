import { AuthGuard } from '@nestjs/passport';

export class RtkGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}
