import React, { useEffect, useState } from "react";
import { LoginForm } from "../components/LoginForm";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../services/authApi";
import { useAuth } from "../components/AuthProvider";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();
  const { login } = useAuth();

  const [
    loginApiCall,
    { data: loginData, isSuccess: isLoginSuccess, isError: isLoginError },
  ] = useLoginMutation();

  const [
    registerApiCall,
    {
      data: registerData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: regsterError,
    },
  ] = useRegisterMutation();

  const handleAuth = (data: {
    name?: string;
    email: string;
    password: string;
    isLogin: boolean;
  }) => {
    if (data.isLogin) {
      if (data.email && data.password) {
        loginApiCall({ email: data.email, password: data.password });
      } else {
        toast.error("Please fill in all fields");
      }
    } else {
      if (data.name && data.email && data.password) {
        registerApiCall({
          name: data.name,
          email: data.email,
          password: data.password,
        });
      } else {
        toast.error("Please fill in all fields");
      }
    }
  };

  useEffect(() => {
    if (isLoginSuccess) {
      login(loginData);
      toast.success("Login successful!");
      navigate("/");
    }
    if (isLoginError) {
      toast.error("Login failed. Please check your credentials.");
      navigate("/login");
    }
  }, [loginData, isLoginSuccess, isLoginError, login, navigate]);

  useEffect(() => {
    if (isRegisterSuccess) {
      toast.success("Registration successful! Please login.");
      setIsLogin(true);
    }
    if (isRegisterError) {
      toast.error("Registration failed. Please try again.");
      setIsLogin(false);
    }
  }, [registerData, isRegisterSuccess, isRegisterError, regsterError]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white p-6 md:p-10 overflow-hidden">
      <div className="w-full max-w-sm md:max-w-3xl p-8">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-12" />
        </div>
        <LoginForm
          onAuth={handleAuth}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />
      </div>
    </div>
  );
};

export default Login;
