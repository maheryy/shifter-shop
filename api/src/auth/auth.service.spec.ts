import { Test } from '@nestjs/testing';
import { Prisma, Role } from '@prisma/client';
import { createMock } from '@golevelup/ts-jest';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { EncryptionService } from '../encryption/encryption.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  const testingModuleBuilder = Test.createTestingModule({
    providers: [AuthService],
  });

  testingModuleBuilder.useMocker(createMock);

  describe('The register method', () => {
    it('should return a user', async () => {
      const testingModule = await testingModuleBuilder.compile();
      const userService = testingModule.get(UserService);

      const user = {
        id: 1,
        email: 'leone@abbacch.io',
        firstname: 'Leone',
        lastname: 'Abbacchio',
        password: '5482J9$01l5',
        role: Role.User,
        profileId: null,
      };

      jest.mocked(userService).create.mockResolvedValueOnce(user);

      const authService = testingModule.get(AuthService);
      const returnedValue = await authService.register(user);

      expect(returnedValue).toStrictEqual(user);
    });

    it("should throw a ConflictException if the user's email is already registered", async () => {
      const testingModule = await testingModuleBuilder.compile();

      const userService = testingModule.get(UserService);

      const user = {
        id: 1,
        email: 'leone@abbacch.io',
        firstname: 'Leone',
        lastname: 'Abbacchio',
        password: '5482J9$01l5',
        role: Role.User,
        profileId: null,
      };

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

      const authService = testingModule.get(AuthService);
      const promise = authService.register(user);

      await expect(promise).rejects.toThrowError(ConflictException);
    });

    it('should throw an error if any other error occurs', async () => {
      const testingModule = await testingModuleBuilder.compile();
      const userService = testingModule.get(UserService);

      const user = {
        id: 1,
        email: 'leone@abbacch.io',
        firstname: 'Leone',
        lastname: 'Abbacchio',
        password: '5482J9$01l5',
        role: Role.User,
        profileId: null,
      };

      jest
        .mocked(userService)
        .create.mockRejectedValueOnce(new Error('Something went wrong'));

      const authService = testingModule.get(AuthService);
      const promise = authService.register(user);

      await expect(promise).rejects.toThrowError();
    });
  });

  describe('The login method', () => {
    it('should return a user', async () => {
      const testingModule = await testingModuleBuilder.compile();

      const credentials = {
        email: 'leone@abbacch.io',
        password: '5482J9$01l5',
      };

      const user = {
        id: 1,
        firstname: 'Leone',
        lastname: 'Abbacchio',
        role: Role.User,
        profileId: null,
        ...credentials,
      };

      const userService = testingModule.get(UserService);

      jest.mocked(userService).findOne.mockResolvedValueOnce(user);

      const authService = testingModule.get(AuthService);
      const returnedValue = await authService.login(credentials);

      expect(returnedValue).toStrictEqual(user);
    });

    it("should throw an UnauthorizedException if the user's email is not registered", async () => {
      const testingModule = await testingModuleBuilder.compile();

      const credentials = {
        email: 'leone@abbacch.io',
        password: '5482J9$01l5',
      };

      const userService = testingModule.get(UserService);

      jest.mocked(userService).findOne.mockResolvedValueOnce(null);

      const authService = testingModule.get(AuthService);
      const promise = authService.login(credentials);

      await expect(promise).rejects.toThrowError(UnauthorizedException);
    });

    it("should throw an UnauthorizedException if the user's password is incorrect", async () => {
      const testingModule = await testingModuleBuilder.compile();

      const credentials = {
        email: 'leone@abbacch.io',
        password: '5482J9$01l5',
      };

      const encryptionService = testingModule.get(EncryptionService);

      jest
        .mocked(encryptionService)
        .validatePassword.mockResolvedValueOnce(false);

      const authService = testingModule.get(AuthService);
      const promise = authService.login(credentials);

      await expect(promise).rejects.toThrowError(UnauthorizedException);
    });

    describe('The getToken method', () => {
      it('should sign the userId and return a token', async () => {
        const testingModule = await testingModuleBuilder.compile();

        const jwtService = testingModule.get(JwtService);

        jest
          .mocked(jwtService)
          .sign.mockReturnValueOnce(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTY4MTcyNjUwM30.T1I0xTbyip1LMf7niqC0zLO9SSKDrhY07D9w8tMDfOM',
          );

        const userId = 1;
        const authService = testingModule.get(AuthService);
        const token = authService.getToken(userId);

        expect(token).toStrictEqual(expect.any(String));
      });
    });
  });
});
