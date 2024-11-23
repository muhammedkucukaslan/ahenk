import { toast } from 'sonner';
import { ToastOptions } from '../types';

export class ToastService {
  static success(message: string, options?: ToastOptions): void {
    toast.success(message, {
      description: options?.description,
      duration: options?.duration || 3000,
    });
  }

  static error(message: string, options?: ToastOptions): void {
    toast.error(message, {
      description: options?.description,
      duration: options?.duration || 5000,
    });
  }
}
