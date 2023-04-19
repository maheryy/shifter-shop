import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

export const IsAuthenticated = () => UseGuards(JwtAuthGuard);
