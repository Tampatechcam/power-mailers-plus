export type User = {
  role: 'admin' | 'user';
};

export type MenuItem = {
  name: string;
  icon: string;
  path: string;
  adminOnly?: boolean;
};