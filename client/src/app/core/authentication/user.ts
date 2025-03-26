import { User } from './interface';

export const admin: User = {
  id: 1,
  name: 'علی رضا احمدی',
  email: 'ahmadi@test.com',
  avatar: 'images/avatar.jpg',
};

export const guest: User = {
  name: 'unknown',
  email: 'unknown',
  avatar: 'images/avatar-default.jpg',
};
