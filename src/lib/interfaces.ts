import { ToastOptions } from './types';

export interface INotificationService {
  showSuccess(message: string, options?: ToastOptions): void;
  showError(message: string, options?: ToastOptions): void;
}

export interface ICacheService {
  revalidateMultiple(paths: string[]): void;
}