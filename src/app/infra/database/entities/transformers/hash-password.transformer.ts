import { hashSync } from 'bcrypt';
import { ValueTransformer } from 'typeorm';

export const HashPasswordTransformer: ValueTransformer = {
  to(value: string): string {
    return hashSync(value, 10);
  },
  from(value: string): string {
    return value;
  },
};
