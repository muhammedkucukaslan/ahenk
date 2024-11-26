import { UserService } from "@/src/features/users/server/service";
import { NextRequest, NextResponse } from "next/server";
import { createResult } from "@/src/utils/returnFunctions";
import { registerSchema, loginSchema } from "@/src/features/users/validation";
import { auth } from "../useCases/auth";

export const AuthController = {
    signup: async (req: NextRequest): Promise<ResultResponse<null>> => {
        try {
            const data = await req.json();

            await registerSchema.validate(data);
            //e posta dogrulamsai
            const result = await auth.signup(data);

            if (!result.success || !result.data) {
                return NextResponse.json(createResult(false, null, result.message || "Hesap oluşturma işleminde hata oluştu."), { status: 400 });
            }

            const response = NextResponse.json(createResult(true, null), { status: 201 });
            response.cookies.set({
                name: "token",
                value: result.data.token,
                path: '/',
            });

            return response;
        } catch (error: any) {
            console.error("Signup Error:", error);
            if (error.name === 'ValidationError') {
                return NextResponse.json(createResult(false, null, "Geçersiz bilgiler gönderildi"), { status: 400 });
            }
            return NextResponse.json(createResult(false, null, "Hesap oluşturma işleminde hata oluştu"), { status: 500 });
        }
    },
    login: async (req: NextRequest): Promise<ResultResponse<null>> => {
        try {
            const data = await req.json();
            await loginSchema.validate(data);

            const result = await auth.login(data);

            if (!result.success || !result.data) {
                return NextResponse.json(createResult(false, null, result.message || "Login failed"), { status: 500 });
            }

            const response = NextResponse.json(createResult(true, null), { status: 200 });
            console.log("token", result.data.token);
            response.cookies.set({
                name: "token",
                value: result.data.token,
                path: '/',
            });
            return response;
        }
        catch (error: any) {
            console.error("Signin Error:", error);
            if (error.name === 'ValidationError') {
                return NextResponse.json(createResult(false, null, "Geçersiz bilgiler gönderildi."), { status: 400 });
            }
            return NextResponse.json(createResult(false, null, "Giriş işleminde hata oluştu."), { status: 500 });
        }
    },
    logout: async (req: NextRequest): Promise<ResultResponse<null>> => {
        try {
            const token = req.cookies.get("token");

            if (!token) {
                return NextResponse.json(createResult(false, null, "Yetkilendirilmemiş işlem yapıldı"), { status: 400 });
            }
            
            const response = NextResponse.json(createResult(true, null), { status: 200 });
            response.cookies.set({
                name: "token",
                value: "",
            })
            return response;

        } catch (error: any) {
            console.error("Logout Error:", error);
            return NextResponse.json(createResult(false, null, "Çıkış yapmada hata oluştu"), { status: 500 });
        }
    }
}