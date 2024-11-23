"use client";

import SignupFrom from "@/src/features/auth/forms/Signup-from";
import { CardContent, CardFooter, CardHeader } from "@/src/components/ui/card";
import React from "react";

const SignupPage = () => {
  return (
    <div className={"flex flex-col w-screen h-screen  justify-center "}>
      <CardHeader className={"text-2xl font-semibold"}>Hoşgeldiniz</CardHeader>
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
  );
};

export default SignupPage;
