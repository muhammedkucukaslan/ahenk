export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface ToastOptions {
  description?: string;
  duration?: number;
}

export interface NotificationConfig {
  customMessages?: {
    success?: string;
    error?: string;
  };
  toastOptions?: ToastOptions;
}

export interface CacheConfig {
  paths: string[];
}
