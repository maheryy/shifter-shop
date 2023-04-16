import {
  Category,
  Order,
  OrderStatus,
  PaymentStatus,
  Prisma,
  PrismaClient,
  Product,
  Role,
  User,
} from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

const array = (length: number = 0) => Array.from({ length });
const randomItem = <T>(data: T[]): T => faker.helpers.arrayElement(data);

const clearDatabase = async () => {
  await prisma.$transaction([
    prisma.review.deleteMany(),
    prisma.orderProduct.deleteMany(),
    prisma.customerProduct.deleteMany(),
    prisma.product.deleteMany(),
    prisma.payment.deleteMany(),
    prisma.order.deleteMany(),
    prisma.profile.deleteMany(),
    prisma.user.deleteMany(),
    prisma.category.deleteMany(),
  ]);
};

const loadUserData = (length: number): Prisma.UserCreateInput[] => [
  {
    email: 'admin@shiftershop.com',
    firstname: 'Shifter',
    lastname: 'Pro',
    password: 'password',
    role: Role.Admin,
  },
  {
    email: 'user@shiftershop.com',
    firstname: 'Shifter',
    lastname: 'Low',
    password: 'password',
    role: Role.User,
    profile: {
      create: {
        phone: faker.phone.number(),
        address: faker.address.streetAddress(),
      },
    },
  },
  ...array(length).map((_, i) => {
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();

    return {
      email: faker.internet.email(
        firstname.toLowerCase(),
        lastname.toLowerCase(),
        'shiftershop.com',
      ),
      firstname: firstname,
      lastname: lastname,
      password: 'password',
      role: Role.User,
      profile: {
        create: {
          phone: faker.phone.number(),
          address: faker.address.streetAddress(),
        },
      },
    } as Prisma.UserCreateInput;
  }),
];

const loadCategoryData = (
  length: number,
): Prisma.CategoryUncheckedCreateInput[] => [
  ...array(length).map(
    (_, i) =>
      ({
        name: faker.commerce.department(),
      } as Prisma.CategoryUncheckedCreateInput),
  ),
];

const loadProductData = (
  length: number,
  categories: Category[],
): Prisma.ProductUncheckedCreateInput[] => [
  ...array(length).map(
    (_, i) =>
      ({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.datatype.number({
          min: 100,
          max: 10000,
        }),
        image: faker.image.imageUrl(),
        rating: faker.datatype.number(),
        categoryId: randomItem(categories).id,
      } as Prisma.ProductUncheckedCreateInput),
  ),
];

const loadOrderData = (
  users: User[],
  products: Product[],
): Prisma.OrderUncheckedCreateInput[] => {
  const uniqueKeyPairs = new Set<string>();

  const generateOrderItem = (
    customerId: number,
    productId: number,
  ): Prisma.OrderProductCreateManyOrderInput | null => {
    const key = `${customerId}-${productId}`;
    if (uniqueKeyPairs.has(key)) {
      return null;
    }

    uniqueKeyPairs.add(key);

    return {
      productId: productId,
      quantity: faker.datatype.number({ min: 1, max: 5 }),
    };
  };

  return users.reduce((acc, user) => {
    const orderItems = faker.helpers
      .arrayElements(products, faker.datatype.number({ min: 0, max: 3 }))
      .map((product) => generateOrderItem(user.id, product.id))
      .filter(
        (product) => product !== null,
      ) as Prisma.OrderProductCreateManyOrderInput[];

    if (orderItems.length === 0) {
      return acc;
    }

    return [
      ...acc,
      {
        reference: faker.color.rgb(),
        total: faker.datatype.number(),
        status: faker.helpers.arrayElement(Object.values(OrderStatus)),
        customerId: user.id,
        payment: {
          create: {
            status: PaymentStatus.Confirmed,
            id: faker.database.mongodbObjectId(),
          },
        },
        products: { createMany: { data: orderItems } },
      } as Prisma.OrderUncheckedCreateInput,
    ];
  }, [] as Prisma.OrderUncheckedCreateInput[]);
};

const loadCustomerProductData = (
  users: User[],
  products: Product[],
): Prisma.CustomerProductUncheckedCreateInput[] => {
  const uniqueKeyPairs = new Set<string>();

  const generateItem = (
    customerId: number,
    productId: number,
  ): Prisma.CustomerProductUncheckedCreateInput | null => {
    const key = `${customerId}-${productId}`;
    if (uniqueKeyPairs.has(key)) {
      return null;
    }

    uniqueKeyPairs.add(key);

    return {
      customerId: customerId,
      productId: productId,
      quantity: faker.datatype.number({ min: 1, max: 5 }),
    };
  };

  return users.reduce((acc, user) => {
    const orderItems = faker.helpers
      .arrayElements(products, faker.datatype.number({ min: 0, max: 3 }))
      .map((product) => generateItem(user.id, product.id))
      .filter(
        (product) => product !== null,
      ) as Prisma.CustomerProductUncheckedCreateInput[];

    if (orderItems.length === 0) {
      return acc;
    }

    return [...acc, ...orderItems];
  }, [] as Prisma.CustomerProductUncheckedCreateInput[]);
};

const loadReviewData = (
  length: number,
  orders: Order[],
  users: User[],
  products: Product[],
): Prisma.ReviewCreateManyInput[] => [
  ...array(length).map((_, i) => ({
    title: faker.lorem.sentence(3),
    details: faker.lorem.sentence(10),
    rating: faker.datatype.number(),
    productId: randomItem(products).id,
    orderId: randomItem(orders).id,
    authorId: randomItem(users).id,
  })),
];

const main = async () => {
  await clearDatabase();

  const users = await Promise.all(
    loadUserData(8).map((user) => prisma.user.create({ data: user })),
  );

  const categories = await Promise.all(
    loadCategoryData(6).map((category) =>
      prisma.category.create({ data: category }),
    ),
  );

  const products = await Promise.all(
    loadProductData(30, categories).map((product) =>
      prisma.product.create({ data: product }),
    ),
  );

  const customerProducts = await Promise.all(
    loadCustomerProductData(users.slice(1), products).map((order) =>
      prisma.customerProduct.create({ data: order }),
    ),
  );

  const orders = await Promise.all(
    loadOrderData(users.slice(1), products).map((order) =>
      prisma.order.create({ data: order }),
    ),
  );

  const reviews = await Promise.all(
    loadReviewData(50, orders, users.slice(1), products).map((review) =>
      prisma.review.create({ data: review }),
    ),
  );

  console.log(users.length, `users created`);
  console.log(categories.length, `categories created`);
  console.log(products.length, `products created`);
  console.log(customerProducts.length, `customer products created`);
  console.log(orders.length, `orders created`);
  console.log(reviews.length, `reviews created`);
};

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    console.log('Seeding complete.');
    await prisma.$disconnect();
  });
