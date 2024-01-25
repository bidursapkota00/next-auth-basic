"use client";
import Link from "next/link";
import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";

export default function Login() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).then((data) => {
        setSuccess(data.success);
        setError(data.error);
      });
    });
  };
  return (
    <Card className="my-[50px] mx-[10%]">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(loginSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <p className="p-4 bg-destructive/15 rounded-md text-red-500">
                {error}
              </p>
            )}
            {success && (
              <p className="p-4 bg-emerald-500/15 rounded-md text-emerald-500">
                {success}
              </p>
            )}
            <Button type="submit">Login</Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <div className="flex">
          <Button onClick={() => {}} variant="outline">
            <FcGoogle />
          </Button>
          <Button onClick={() => {}} variant="outline">
            <FaGithub />
          </Button>
        </div>
      </CardFooter>

      <CardFooter>
        <Link href="/auth/register">Dont have an account?</Link>
      </CardFooter>
    </Card>
  );
}