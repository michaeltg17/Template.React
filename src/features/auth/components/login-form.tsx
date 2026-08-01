"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { loginInputSchema, LoginInput, useLogin } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Login = () => (
  <Suspense fallback={<div className="text-center py-4">...</div>}>
    <LoginFormInner />
  </Suspense>
);

const LoginFormInner = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginInputSchema),
    defaultValues: { email: "", password: "" },
  });

  const login = useLogin({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => login.mutate(data))} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="admin@example.com"
          className="mt-1 block w-full"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          placeholder="password123"
          className="mt-1 block w-full"
        />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={login.isPending}>
        {login.isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};
