"use client";

import Button from "@/components/Button";
import FormInput from "@/components/FormInputField";
import { RegisterFormSchema } from "@/types/RegisterFormSchema";
import { hashPassword } from "@/utils/hashPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterFormSchema),
  });

  const onSubmit = async (data) => {
    const { salt, hash } = hashPassword(data.password);
    try {
      const res = await fetch("/register/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          hashedPassword: hash,
          salt,
        }),
      });
      const resJson = await res.json();
      console.log("register res", resJson);
      if (resJson.status === 200) {
        const res = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });
        router.push("/");
      } else if (resJson.status === 401) {
        setError(resJson.error);
      }
    } catch (error) {
      console.error("Could not create entry:", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg mx-auto p-4"
    >
      <FormInput
        type="text"
        placeholder="Name"
        name="name"
        register={register}
        error={errors.name}
      />
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
      <FormInput
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        register={register}
        error={errors.confirmPassword}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Register;
