"use client";

import SignupFrom from "@/src/features/auth/forms/Signup-from";
import { CardContent, CardFooter, CardHeader } from "@/src/components/ui/card";
import React from "react";

const SignupPage = () => {
  return (
    <div>
      <CardHeader>Hosgeldiniz</CardHeader>
      <CardContent>
        <SignupFrom />
      </CardContent>
      <CardFooter>
        <p>
          Hesabın var mı? <a href="/login">giris yap</a>
        </p>
      </CardFooter>
    </div>
  );
};

export default SignupPage;
