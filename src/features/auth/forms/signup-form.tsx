'use client';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../users/validation';

import { Form } from '@/src/components/ui/form';
import DynamicFormField, {
  FormFieldType,
} from '@/src/components/global/dynamic-form-field';
import SubmitButton from '@/src/components/global/submit-button';
import { useRouter, useSearchParams } from 'next/navigation';
import { signup } from '../actions';
import { ToastService } from '../../toasts/services';

const SignupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm({
    resolver: yupResolver(registerSchema), // Doğrulama şeması
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: {
    email: string;
    name: string;
    password: string;
  }) => {
    try {
      await signup(data);
      const next = searchParams.get('next');
      const redirectTo = next ? String(next) : '/dashboard';
      router.push(redirectTo);
    } catch (error) {
      console.error('Login error:', error);
      ToastService.error('Kayıt yapılırken bir hata oluştu');
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={'flex flex-col gap-4 w-[100%] font-medium '}
        >
          <DynamicFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='name'
            label='Adı'
            placeholder='Örn: Ali'
          />
          <DynamicFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='email'
            label='E-Posta Adresi'
            placeholder='Örn: johndoe@gmail.com'
          />
          <DynamicFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name='password'
            label='Şifre'
            placeholder='Şifreniz...'
          />
          <SubmitButton
            loading={form.formState.isSubmitting}
            className={'mt-8'}
          >
            Kaydol
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
