export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  themeConfig?: any;
  createdAt: Date;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}
