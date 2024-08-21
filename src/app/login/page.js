"use client";

import Button from "@/components/Button";
import FormInput from "@/components/FormInputField";
import { LoginFormSchema } from "@/types/LoginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg mx-auto p-4"
    >
      <FormInput
        type="email"
        placeholder="Email"
        name="email"
        register={register}
        error={errors.email}
      />
      <FormInput
        type="password"
        placeholder="Password"
        name="password"
        register={register}
        error={errors.password}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Login;
