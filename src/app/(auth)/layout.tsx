import { Card } from "@/src/components/ui/card";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen w-full ">
      <Card className="border-none md:border">{children}</Card>
    </main>
  );
};

export default AuthLayout;
