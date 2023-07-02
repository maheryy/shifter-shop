import { UseInterceptors } from '@nestjs/common';
import { RemovePasswordInterceptor } from '../interceptors/remove-password.interceptor';

export const RemovePassword = () => UseInterceptors(RemovePasswordInterceptor);
