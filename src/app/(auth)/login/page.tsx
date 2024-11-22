// app/login/page.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter , useSearchParams } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Hata mesajını sıfırla
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.log(data);
        setError(data.message || "Login failed");
      }
      const next = searchParams.get('next'); // 'next' parametresini URL'den alıyoruz
      const redirectTo = next ? String(next) : '/dashboard'; // Eğer 'next' varsa oraya git, yoksa '/dashboard'a git
      router.push(redirectTo);
    } catch (err) {
      setError("MUHAMMED HATA YAPMIS");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <Label  htmlFor="email" >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              style={{color : 'green'}}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    
  );
};

export default LoginPage;
