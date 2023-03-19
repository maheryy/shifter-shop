import { ConfigModuleOptions } from '@nestjs/config';

export const configModuleOptions: ConfigModuleOptions = {
  ignoreEnvFile: true,
  ignoreEnvVars: true,
  load: [
    () => ({
      debug: false,
      clientHost: 'http://localhost:3000',
      mailer: 'smtp://localhost:1025',
      stripe: {
        secretKey: 'sk_test_51JY2Z',
        publicKey: 'pk_test_51JY2Z',
        signingSecret: 'whsec_51JY2Z',
      },
    }),
  ],
};
