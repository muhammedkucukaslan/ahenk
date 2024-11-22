"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../users/validation";
import { Form } from "@/src/components/ui/form";
import DynamicFormField, {
  FormFieldType,
} from "@/src/components/global/dynamic-form-field";
import SubmitButton from "@/src/components/global/submit-button";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: yupResolver(loginSchema), // Doğrulama şeması
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: {
    email: string;
    name: string;
    password: string;
  }) => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const errorData = await res.json();
        form.setError("email", {
          type: "manual",
          message: errorData.message || "Kayıt başarısız oldu.",
        });
      }
    } catch (error) {
      console.error(error);
      form.setError("email", {
        type: "manual",
        message: "Beklenmeyen bir hata oluştu.",
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DynamicFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Adı"
            placeholder="Örn: Ali"
          />
          <DynamicFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="E-Posta Adresi"
            placeholder="Örn: johndoe@gmail.com"
          />
          <DynamicFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name="password"
            label="Şifre"
            placeholder="Şifreniz..."
          />
          <SubmitButton loading={form.formState.isSubmitting}>
            Kaydol
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
