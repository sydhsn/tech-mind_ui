import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { faker } from "@faker-js/faker";

interface LoginFormProps extends React.ComponentProps<"div"> {
  onAuth: (data: {
    name?: string;
    email: string;
    password: string;
    isLogin: boolean;
  }) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export function LoginForm({
  className,
  onAuth,
  isLogin,
  setIsLogin,
  ...props
}: LoginFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth({ ...formData, isLogin });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden bg-black text-gray-300 border border-gray-700">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8 w-full space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">
                {isLogin ? "Welcome back" : "Create an account"}
              </h1>
              <p className="text-gray-500">
                {isLogin ? "Login to continue" : "Sign up to get started"}
              </p>
            </div>

            {!isLogin && (
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-800 text-white border-gray-600"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-800 text-white border-gray-600"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-800 text-white border-gray-600"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold"
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>

            <div className="text-center text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="underline text-blue-400 hover:text-blue-300"
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </div>
          </form>

          <div className="hidden md:block bg-gray-800 relative">
            <img
              src={faker.image.url({ width: 400, height: 400 })}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover opacity-30 pointer-events-none"
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-gray-500">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and
        <a href="#" className="underline">
          {" "}
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
