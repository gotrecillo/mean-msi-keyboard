import thinky from './thinky';

export const User = thinky.createModel('users', {
  username: thinky.type.string().required(),
  password: thinky.type.string().required(),
  createdAt: thinky.type.date().default(thinky.r.now()),
});
