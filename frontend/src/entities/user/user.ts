export interface User {
  id: number;
  email?: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  active: number;
  locale?: string;
}
