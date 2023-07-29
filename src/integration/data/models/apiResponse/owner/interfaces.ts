import { Owner } from '@prisma/client';

export type PartialOwner = Omit<Owner, 'created_at' | 'updated_at' | 'user_email'>;
