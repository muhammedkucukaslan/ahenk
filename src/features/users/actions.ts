import { ApiResponseHandler } from '@/src/lib/api-response-handler';
import { axiosInstance } from '@/src/utils';
import * as yup from 'yup';
import { LoginSchema } from './schemas';

const userHandler = new ApiResponseHandler({
  resourceName: 'Kullanıcı',
  cachePaths: ['/users'],
  customMessages: {
    success: 'Kullanıcı işlemi başarılı',
    error: 'Kullanıcı işlemi başarısız',
  },
  toastOptions: {
    duration: 3000,
  },
});

export const login = async (
  values: yup.InferType<typeof LoginSchema>
): Promise<boolean> => {
  try {
    const res = await axiosInstance.post('/login', values);
    return userHandler.handleResponse(res, 'giriş');
  } catch (error: any) {
    return userHandler.handleError(error, 'giriş');
  }
};
