import { HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { Prisma } from '@prisma/client';
import { AuthModule } from 'src/auth/auth.module';
import { EncryptionService } from 'src/encryption/encryption.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('Auth (e2e)', () => {
  const configService = {
    getOrThrow: jest.fn((key: string) => {
      if (key === 'bcrypt.saltOrRounds') {
        return 10;
      }

      const secret = 'secret';

      if (key === 'jwt') {
        return {
          secret,
        };
      }

      if (key === 'jwt.secret') {
        return secret;
      }
    }),
  };

  const userService = {
    create: jest.fn((data) => data),
    findOne: jest.fn((where) => where),
  };

  const encryptionService = {
    validatePassword: jest.fn(() => Promise.resolve(true)),
    hashPassword: jest.fn(() =>
      Promise.resolve(
        '$2b$10$db57t62bP8D7Ntz2l83jyODI6MPCn1IbNTpFWDxbNsfCU5DsD2YLW',
      ),
    ),
  };

  const prismaService = {
    onModuleInit: jest.fn(),
  };

  const testingModuleBuilder = Test.createTestingModule({
    imports: [AuthModule],
  })
    .overrideProvider(ConfigService)
    .useValue(configService)
    .overrideProvider(UserService)
    .useValue(userService)
    .overrideProvider(EncryptionService)
    .useValue(encryptionService)
    .overrideProvider(PrismaService)
    .useValue(prismaService);

  describe('POST /auth/register', () => {
    it('should respond with a 201 status code and a JWT', async () => {
      const testingModule = await testingModuleBuilder.compile();
      const app = testingModule.createNestApplication();

      await app.init();

      const httpServer = app.getHttpServer();

      const data = {
        email: 'leone@abbacch.io',
        firstname: 'Leone',
        lastname: 'Abbacchio',
        password: '39vH925964@',
      };

      const { body } = await request(httpServer)
        .post('/auth/register')
        .send(data)
        .expect(HttpStatus.CREATED);

      const expectedPayload = {
        token: expect.any(String),
      };

      expect(body).toStrictEqual(expectedPayload);

      await app.close();
    });

    it("should respond with a 409 status code if the user's email already exists", async () => {
      const testingModule = await testingModuleBuilder.compile();
      const app = testingModule.createNestApplication();

      await app.init();

      const httpServer = app.getHttpServer();

      const data = {
        email: 'leone@abbacch.io',
        firstname: 'Leone',
        lastname: 'Abbacchio',
        password: '39vH925964@',
      };

      const userService = app.get(UserService);

      jest.mocked(userService).create.mockRejectedValueOnce(
        new Prisma.PrismaClientKnownRequestError(
          'Unique constraint failed on the fields: (`email`)',
          {
            code: 'P2002',
            clientVersion: '4.11.0',
            meta: { target: ['email'] },
          },
        ),
      );

      await request(httpServer)
        .post('/auth/register')
        .send(data)
        .expect(HttpStatus.CONFLICT);

      await app.close();
    });
  });

  describe('POST /auth/login', () => {
    it('should respond with a 200 status code and a payload containing the JWT and the user without password', async () => {
      const testingModule = await testingModuleBuilder.compile();
      const app = testingModule.createNestApplication();

      await app.init();

      const httpServer = app.getHttpServer();

      const data = {
        email: 'leone@abbacch.io',
        password: '39vH925964@',
      };

      const { body } = await request(httpServer)
        .post('/auth/login')
        .send(data)
        .expect(HttpStatus.OK);

      const expectedPayload = {
        token: expect.any(String),
      };

      expect(body).toStrictEqual(expectedPayload);

      await app.close();
    });

    it('should respond with a 401 status code if the user does not exist', async () => {
      const testingModule = await testingModuleBuilder.compile();
      const app = testingModule.createNestApplication();

      await app.init();

      const httpServer = app.getHttpServer();

      const data = {
        email: 'leone@abbacch.io',
        password: '39vH925964@',
      };

      const userService = app.get(UserService);

      jest.mocked(userService).findOne.mockResolvedValueOnce(null);

      await request(httpServer)
        .post('/auth/login')
        .send(data)
        .expect(HttpStatus.UNAUTHORIZED);

      await app.close();
    });

    it('should respond with a 401 status code if the password is invalid', async () => {
      const testingModule = await testingModuleBuilder.compile();
      const app = testingModule.createNestApplication();

      await app.init();

      const httpServer = app.getHttpServer();

      const data = {
        email: 'leone@abbacch.io',
        password: '39vH925964@',
      };

      const encryptionService = app.get(EncryptionService);

      jest
        .mocked(encryptionService)
        .validatePassword.mockResolvedValueOnce(false);

      await request(httpServer)
        .post('/auth/login')
        .send(data)
        .expect(HttpStatus.UNAUTHORIZED);

      await app.close();
    });
  });
});
