import { UseInterceptors } from '@nestjs/common';
import { RemovePasswordInterceptor } from 'src/interceptors/remove-password.interceptor';

export const RemovePassword = () => UseInterceptors(RemovePasswordInterceptor);
