import { ToastService } from '@/src/lib/services/toast-service';
import { ToastOptions } from '../types';
import { INotificationService } from '../interfaces';

export class ToastNotificationService implements INotificationService {
  showSuccess(message: string, options?: ToastOptions): void {
    ToastService.success(message, options);
  }

  showError(message: string, options?: ToastOptions): void {
    ToastService.error(message, options);
  }
}
