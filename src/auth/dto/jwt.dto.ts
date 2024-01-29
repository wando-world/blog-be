import { IPayload } from '../security/payload.interface';

export class JwtDto {
  id: number;
  nickname: string;
  atk: string;

  constructor(payload: IPayload, atk: string) {
    this.id = payload.id;
    this.nickname = payload.nickname;
    this.atk = atk;
  }
}
