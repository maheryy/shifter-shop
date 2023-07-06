import { TReviewCreatedData } from '@shifter-shop/amqp';
import { Product } from 'src/product/entities/product.entity';

export class MessageController {
  static async onReviewCreated(data: TReviewCreatedData) {
    console.log('[product] onReviewCreated', data);

    const { productId, rating, reviewCount } = data;

    await Product.update(productId, {
      rating,
      reviewCount,
    });
  }
}
