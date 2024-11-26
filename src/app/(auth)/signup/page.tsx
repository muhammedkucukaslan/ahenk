"use client";

import SignupFrom from "@/src/features/auth/forms/Signup-from";
import { CardContent, CardFooter, CardHeader } from "@/src/components/ui/card";
import React from "react";

const SignupPage = () => {
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
        <CardHeader className={"text-2xl font-semibold"}>
          Hoşgeldiniz
        </CardHeader>
        <CardContent>
          <SignupFrom />
        </CardContent>
        <CardFooter>
          <p className={"font-semibold tracking-wide "}>
            Hesabın var mı?{" "}
            <a href="/login" className={"text-blue-600"}>
              giris yap
            </a>
          </p>
        </CardFooter>
      </div>
    </div>
  );
};

export default SignupPage;
