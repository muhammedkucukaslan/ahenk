import { ICacheService, INotificationService } from './interfaces';
import { MessageFormatter } from './message-formatter';
import { ApiResponse, CacheConfig, NotificationConfig } from './types';

export class ApiResponseHandler<T = any> {
  private notificationService: INotificationService;
  private cacheService: ICacheService;
  private messageFormatter: MessageFormatter;
  private cacheConfig?: CacheConfig;
  private notificationConfig: NotificationConfig;

  constructor(
    resourceName: string,
    config: {
      notificationService: INotificationService;
      cacheService: ICacheService;
      cacheConfig?: CacheConfig;
      notificationConfig?: NotificationConfig;
    }
  ) {
    this.notificationService = config.notificationService;
    this.cacheService = config.cacheService;
    this.messageFormatter = new MessageFormatter(
      resourceName,
      config.notificationConfig?.customMessages
    );
    this.cacheConfig = config.cacheConfig;
    this.notificationConfig = config.notificationConfig || {};
  }

  private handleSuccess(action: string): void {
    const message = this.messageFormatter.formatSuccess(action);
    this.notificationService.showSuccess(message, {
      description: 'Operation completed successfully.',
      ...this.notificationConfig.toastOptions,
    });

    if (this.cacheConfig?.paths.length) {
      this.cacheService.revalidate(this.cacheConfig.paths);
    }
  }

  private handleError(action: string, errorMessage?: string): void {
    const message = this.messageFormatter.formatError(action);
    this.notificationService.showError(message, {
      description: errorMessage || 'An error occurred.',
      ...this.notificationConfig.toastOptions,
    });
  }

  public handleResponse(response: ApiResponse<T>, action: string): boolean {
    if (response.success) {
      this.handleSuccess(action);
      return true;
    }

    this.handleError(action, response.message);
    return false;
  }

  public handleException(error: any, action: string): boolean {
    console.error(`${action} error:`, error);
    this.handleError(action);
    return false;
  }
}
