import { NextRequest } from 'next/server';
import { handleSuccessResponse, handleErrorResponse, validateData } from '@/src/utils/returnFunctions';
import { registerSchema, loginSchema } from '@/src/features/users/server/validation';
import { auth } from '../useCases/auth';

export const AuthController = {
  signup: async (req: NextRequest): IResponse => {
    try {
      const data = await req.json();

      const validatedData = await validateData(data, registerSchema);
      if (!validatedData) {
        return handleErrorResponse('INVALID_DATA', 'Geçersiz bilgiler gönderildi');
      }
      const result = await auth.signup(validatedData);

      if (!result.success) {
        return handleErrorResponse(result.ERR_CODE, result.message)
      }

      const response = handleSuccessResponse(null, 200);
      response.cookies.set({
        name: 'token',
        value: result.data,
        path: '/',
        maxAge: 14 * 24 * 60 * 60 * 1000
      });

      return response;
    } catch (error: any) {
      return handleErrorResponse('SERVER_ERROR', 'Kayıt işleminde hata oluştu');
    }
  },
  login: async (req: NextRequest): IResponse => {
    try {
      const data = await req.json();
      await loginSchema.validate(data);

      const result = await auth.login(data);

      if (!result.success) {
        return handleErrorResponse(result.ERR_CODE, result.message);
      }

      const response = handleSuccessResponse(null, 200);
      response.cookies.set({
        name: 'token',
        value: result.data,
        path: '/',
        maxAge: 14 * 24 * 60 * 60 * 1000
      });
      return response;
    } catch (error: any) {
      console.error('Login Error:', error);
      return handleErrorResponse('SERVER_ERROR', 'Giriş işleminde hata oluştu');
    }
  },
  logout: async (req: NextRequest): IResponse => {
    try {
      const token = req.cookies.get('token');

      if (!token) {
        return handleErrorResponse('UNAUTHORIZED', 'Kullanıcı bilgileri getirilirken bir hata oluştu');
      }

      const response = handleSuccessResponse(null, 200);
      response.cookies.set({
        name: 'token',
        value: '',
      });
      return response;
    } catch (error: any) {
      console.error('Logout Error:', error);
      return handleErrorResponse('SERVER_ERROR', 'Çıkış işleminde hata oluştu');
    }
  },
};
