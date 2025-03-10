import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'rol'; // Debe coincidir con el valor en `RolesGuard`
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
