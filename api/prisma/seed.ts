import {
  OrderStatus,
  PaymentStatus,
  Prisma,
  PrismaClient,
  Role,
  User,
} from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

const array = (length: number = 0) => Array.from({ length });
const foreignKey = (data: unknown[]) =>
  faker.datatype.number({ min: 1, max: data.length });

const clearDatabase = async () => {
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.profile.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.review.deleteMany(),
    prisma.customerProduct.deleteMany(),
    prisma.order.deleteMany(),
    prisma.payment.deleteMany(),
  ]);
};

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'admin@shiftershop.com',
    firstname: 'Shifter',
    lastname: 'Pro',
    password: 'password',
    role: Role.Admin,
    profile: {
      create: {
        phone: faker.phone.number(),
        address: faker.address.streetAddress(),
      },
    },
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
  ...array(8).map((_, i) => {
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();

    return {
      email: faker.internet.email(firstname, lastname, 'shiftershop.com'),
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

const categoryData: Prisma.CategoryUncheckedCreateInput[] = [
  ...array(6).map(
    (_, i) =>
      ({
        name: faker.commerce.department(),
        products: {
          createMany: {
            data: array(10).map((_, i) => ({
              name: faker.commerce.productName(),
              description: faker.commerce.productDescription(),
              price: faker.datatype.number({
                min: 100,
                max: 10000,
              }),
              image: faker.image.imageUrl(),
              rating: faker.datatype.number(),
            })),
          },
        },
      } as Prisma.CategoryUncheckedCreateInput),
  ),
];

const orderData: Prisma.OrderUncheckedCreateInput[] = [
  ...array(10).map((_, i) => {
    const customerId = foreignKey(userData);
    return {
      reference: faker.datatype.uuid(),
      total: faker.datatype.number(),
      status: faker.helpers.arrayElement(Object.values(OrderStatus)),
      customerId: customerId,
      payment: {
        create: {
          status: PaymentStatus.Confirmed,
        },
      },
      items: {
        createMany: {
          data: array(faker.datatype.number({ min: 1, max: 3 })).map(
            (_, i) => ({
              customerId: customerId,
              productId: faker.datatype.number({ min: 1, max: 60 }),
              quantity: faker.datatype.number({ min: 1, max: 5 }),
            }),
          ),
        },
      },
    } as Prisma.OrderUncheckedCreateInput;
  }),
];

const reviewData: Prisma.ReviewCreateManyInput[] = [
  ...array(50).map((_, i) => ({
    title: faker.lorem.sentence(),
    details: faker.lorem.paragraph(),
    rating: faker.datatype.number(),
    productId: faker.datatype.number({ min: 1, max: 60 }),
    orderId: foreignKey(orderData),
    authorId: foreignKey(userData),
  })),
];

const main = async () => {
  await clearDatabase();

  // TODO: Fix this function - Seeding is not working because it cannot find the foreign keys
  return;

  for (const user of userData) {
    await prisma.user.create({ data: user });
  }

  for (const category of categoryData) {
    await prisma.category.create({ data: category });
  }

  for (const order of orderData) {
    await prisma.order.create({ data: order });
  }

  //   const data = await prisma.$transaction([
  //     ...categoryData.map((category) =>
  //       prisma.category.create({ data: category }),
  //     ),
  //     ...userData.map((user) => prisma.user.create({ data: user })),
  //     ...orderData.map((order) => prisma.order.create({ data: order })),
  //   ]);

  //   console.log('Created users :', users.count);
  //   console.log('Created profiles :', profiles.count);
  //   console.log('Created categories :', categories.count);
  //   console.log('Created products :', products.count);
  //   console.log('Created orders :', orders.count);
  //   console.log('Created payments :', payments.count);
  //   console.log('Created reviews :', reviews.count);
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
