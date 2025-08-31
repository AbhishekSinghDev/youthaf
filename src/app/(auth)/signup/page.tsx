"use client";

import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { SignupSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, GithubIcon, Loader2Icon, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SignupPage = () => {
  const router = useRouter();

  const [githubPending, startGithubTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSignUpWithGithub = async () => {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("GitHub sign-up successful");
          },
          onError: () => {
            toast.error("GitHub sign-up failed");
          },
        },
      });
    });
  };

  const handleSignUpWithEmail = async (data: z.infer<typeof SignupSchema>) => {
    startEmailTransition(async () => {
      await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Welcome to YouthAF");
            router.push("/");
          },
          onError: (e) => {
            console.log(e);
            toast.error("Something went wrong! Please try again");
          },
        },
      });
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (values: z.infer<typeof SignupSchema>) => {
    handleSignUpWithEmail(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-92 m-auto h-fit w-full"
        noValidate
      >
        <div className="p-6">
          <div>
            <Link href="/" aria-label="go home">
              <Logo />
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Sign Up for YouthAF
            </h1>
            <p>Create your account to get started</p>
          </div>

          <div className="mt-6">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={githubPending || emailPending}
              onClick={handleSignUpWithGithub}
            >
              {githubPending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <GithubIcon />
              )}
              <span>Sign up with Github</span>
            </Button>
          </div>

          <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <hr className="border-dashed" />
            <span className="text-muted-foreground text-xs">
              Or continue With
            </span>
            <hr className="border-dashed" />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      autoComplete="name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
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
                  <FormLabel className="text-sm">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={togglePasswordVisibility}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={emailPending || githubPending}
            >
              {emailPending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <Send />
              )}
              Create Account
            </Button>
          </div>
        </div>

        <p className="text-accent-foreground text-center text-sm">
          Already have an account?
          <Button asChild variant="link" className="px-2">
            <Link href="/login">Sign in</Link>
          </Button>
        </p>
      </form>
    </Form>
  );
};

export default SignupPage;
