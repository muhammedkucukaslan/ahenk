import { CardContent, CardFooter, CardHeader } from "@/src/components/ui/card";
import LoginForm from "@/src/features/auth/forms/login-form";
import React from "react";

const Login = () => {
  return (
    <div
      className={`flex flex-col min-h-screen justify-center 
      sm:items-center`}
    >
      <div
        className={`flex flex-col justify-center sm:rounded-lg sm:border sm:shadow-lg
        sm:w-96 sm:
       `}
      >
        <CardHeader className={"text-2xl font-semibold"}>Login</CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <p className={"font-semibold tracking-wide "}>
            Hesabın yok mu?{" "}
            <a href="/signup" className={"text-blue-600"}>
              Kayıt ol
            </a>
          </p>
        </CardFooter>
      </div>
    </div>
  );
};

export default Login;
