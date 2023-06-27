import { TUserRegisteredData } from '@shifter-shop/amqp';

export class MessageController {
  static async onUserCreated(data: TUserRegisteredData) {
    console.log('[messaprofilege] onUserCreated', data);
  }
  static async onBusinessRequestCreated(data: TUserRegisteredData) {
    console.log('[profile] onBusinessRequestCreated', data);
  }
}
