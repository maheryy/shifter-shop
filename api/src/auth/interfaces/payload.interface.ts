import { User } from '@prisma/client';

export interface Payload {
  sub: User['id'];
}
