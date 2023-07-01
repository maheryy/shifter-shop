import { TReviewCreatedData } from '@shifter-shop/amqp';

export class MessageController {
  static async onReviewCreated(data: TReviewCreatedData) {
    console.log('[product] onReviewCreated', data);
  }
}
