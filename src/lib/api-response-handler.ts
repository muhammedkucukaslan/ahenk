import { ToastService } from '../features/toasts/services';
import { ToastOptions } from '../features/toasts/types';
import { CacheService } from './services/cache-service';

export interface ApiResponse<T = any> {
  data?: T;
  status: number;
  error?: string;
}

export interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
    status?: number;
  };
  message?: string;
}

export interface ApiHandlerConfig {
  resourceName: string;
  cachePaths?: string[];
  customMessages?: {
    success?: string;
    error?: string;
  };
  toastOptions?: ToastOptions;
}

export class ApiResponseHandler {
  private config: ApiHandlerConfig;

  constructor(config: ApiHandlerConfig) {
    this.config = {
      ...config,
      cachePaths: config.cachePaths || [],
      toastOptions: {
        duration: 3000,
        ...config.toastOptions,
      },
    };
  }

  private getSuccessMessage(action: string): string {
    return (
      this.config.customMessages?.success ||
      `${this.config.resourceName} ${action}`
    );
  }

  private getErrorMessage(action: string): string {
    return (
      this.config.customMessages?.error ||
      `${this.config.resourceName} ${action} başarısız`
    );
  }

  private handleSuccess(action: string): void {
    ToastService.success(this.getSuccessMessage(action), {
      description: 'İşlem başarıyla tamamlandı.',
      ...this.config.toastOptions,
    });

    if (this.config.cachePaths?.length) {
      CacheService.revalidateMultiple(this.config.cachePaths);
    }
  }

  private handleToastError(action: string, error?: string): void {
    ToastService.error(this.getErrorMessage(action), {
      description: error || 'Bir hata oluştu.',
      ...this.config.toastOptions,
    });
  }

  public handleResponse<T>(response: ApiResponse<T>, action: string): boolean {
    if (response.status >= 200 && response.status < 300) {
      this.handleSuccess(action);
      return true;
    }

    this.handleToastError(action, response.error);
    return false;
  }

  public handleError(error: ApiError, action: string): boolean {
    console.error(`${this.config.resourceName} ${action} hatası:`, error);

    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      `${this.config.resourceName} ${action} sırasında bir hata oluştu.`;

    this.handleToastError(action, errorMessage);
    return false;
  }
}
