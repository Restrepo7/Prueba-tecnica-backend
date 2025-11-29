import { SetMetadata } from '@nestjs/common';

// Decorador para especificar roles requeridos
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
