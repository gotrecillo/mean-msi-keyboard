// npm packages
import crypto from 'crypto';

// our packages
import { auth as authConfig } from '../../config';

export const hash = str => (
  crypto
    .createHash('sha256')
    .update(str, authConfig.passwordSalt)
    .digest('hex')
);

