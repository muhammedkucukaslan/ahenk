'use client';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { LoginSchema } from '../schemas';
import { Form } from '@/src/components/ui/form';
import DynamicFormField, {
  FormFieldType,
} from '@/src/components/global/dynamic-form-field';
import SubmitButton from '@/src/components/global/submit-button';
import { login } from '../actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { ToastService } from '../../toasts/services';

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<yup.InferType<typeof LoginSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: yup.InferType<typeof LoginSchema>) => {
    try {
      await login(data);
      const next = searchParams.get('next');
      const redirectTo = next ? String(next) : '/dashboard';
      router.push(redirectTo);
    } catch (error) {
      console.error('Login error:', error);
      ToastService.error('Giriş yapılırken bir hata oluştu');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <DynamicFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='email'
          label='E-Posta Adresi'
          placeholder='örn: johndoe@gmail.com'
        />

        <DynamicFormField
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name='password'
          label='Şifre'
          placeholder='Şifreniz...'
        />

        <SubmitButton loading={form.formState.isSubmitting}>
          Devam et
        </SubmitButton>
      </form>
    </Form>
  );
};

export default LoginForm;
