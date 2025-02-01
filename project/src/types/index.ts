export type User = {
  role: 'admin' | 'user';
};

export type MenuItem = {
  name: string;
  icon: string;
  path: string;
  adminOnly?: boolean;
};

export type Event = {
  id: string;
  title: string;
  description: string | null;
  date: string;
  location: string;
  capacity: number;
  created_at: string;
  created_by: string;
};

export type Registration = {
  id: string;
  event_id: string;
  user_id: string;
  registration_date: string;
};