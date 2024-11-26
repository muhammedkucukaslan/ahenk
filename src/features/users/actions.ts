import { ApiResponseHandler } from '@/src/lib/api-response-handler';
import { ApiResponse } from '@/src/lib/types';
import { axiosInstance } from '@/src/utils';
import * as yup from 'yup';
import { loginSchema } from './validation';
import { ToastNotificationService } from '@/src/lib/services/notification-service';
import { NextJSCacheService } from '@/src/lib/services/cache-service';

const userHandler = new ApiResponseHandler('User', {
  notificationService: new ToastNotificationService(),
  cacheService: new NextJSCacheService(),
  cacheConfig: {
    paths: ['/api/users'],
  },
  notificationConfig: {
    customMessages: {
      success: 'Kullanıcı işlemi başarılı',
      error: 'Kullanıcı işlemi başarısız',
    },
    toastOptions: {
      duration: 4000,
    },
  },
});

export const login = async (
  values: yup.InferType<typeof loginSchema>
): Promise<boolean> => {
  try {
    const res: ApiResponse = await axiosInstance.post('/login', values);
    return userHandler.handleResponse(res, 'giriş');
  } catch (error: any) {
    return userHandler.handleResponse(error, 'giriş');
  }
};
