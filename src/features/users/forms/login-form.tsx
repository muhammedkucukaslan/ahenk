import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { LoginSchema } from '../schemas';
import { Form } from '@/src/components/ui/form';
import DynamicFormField, {
  FormFieldType,
} from '@/src/components/global/dynamic-form-field';

const LoginForm = () => {
  const form = useForm<yup.InferType<typeof LoginSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: yup.InferType<typeof LoginSchema>) => {
    console.log(data);
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
      </form>
    </Form>
  );
};

export default LoginForm;
