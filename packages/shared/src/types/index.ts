export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}
