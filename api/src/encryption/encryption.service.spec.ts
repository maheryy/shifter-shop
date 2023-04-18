import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { EncryptionService } from './encryption.service';

describe('EncryptionService', () => {
  const testingModuleBuilder = Test.createTestingModule({
    providers: [EncryptionService],
  });

  testingModuleBuilder.useMocker((token) => {
    if (token === ConfigService) {
      return {
        getOrThrow: jest.fn((key: string) => {
          if (key === 'bcrypt.saltOrRounds') {
            return 10;
          }
        }),
      };
    }
  });

  describe('The hashPassword method', () => {
    it('should hash a password', async () => {
      const testingModule = await testingModuleBuilder.compile();
      const encryptionService = testingModule.get(EncryptionService);
      const password = '5482J9$01l5';
      const hashedPassword = await encryptionService.hashPassword(password);

      expect(hashedPassword).not.toEqual(password);
    });
  });

  describe('The validatePassword method', () => {
    it('should validate a password', async () => {
      const testingModule = await testingModuleBuilder.compile();
      const encryptionService = testingModule.get(EncryptionService);
      const password = '5482J9$01l5';
      const hashedPassword = await encryptionService.hashPassword(password);

      const isValidPassword = await encryptionService.validatePassword(
        password,
        hashedPassword,
      );

      expect(isValidPassword).toStrictEqual(true);
    });
  });
});
