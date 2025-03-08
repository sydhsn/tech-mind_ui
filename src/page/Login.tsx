import React, { useEffect, useState, useCallback } from "react";
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
    { isSuccess: isRegisterSuccess, isError: isRegisterError },
  ] = useRegisterMutation();

  const handleAuth = useCallback(
    (data: {
      name?: string;
      email: string;
      password: string;
      isLogin: boolean;
    }) => {
      const { name, email, password, isLogin: isLoginMode } = data;

      if (isLoginMode) {
        if (!email || !password) {
          toast.error("Please fill in all fields");
          return;
        }
        loginApiCall({ email, password });
      } else {
        if (!name || !email || !password) {
          toast.error("Please fill in all fields");
          return;
        }
        registerApiCall({ name, email, password });
      }
    },
    [loginApiCall, registerApiCall]
  );

  useEffect(() => {
    if (isLoginSuccess && loginData) {
      localStorage.setItem("accessToken", loginData.accessToken);
      localStorage.setItem("refreshToken", loginData.refreshToken);
      login(loginData.user);
      navigate("/home");
    }
  }, [isLoginSuccess, loginData, login, navigate]);

  useEffect(() => {
    if (isLoginError) {
      toast.error("Login failed. Please check your credentials.");
    }
  }, [isLoginError]);

  useEffect(() => {
    if (isRegisterSuccess) {
      toast.success("Registration successful! Please login.");
      setIsLogin(true);
    }
  }, [isRegisterSuccess]);

  useEffect(() => {
    if (isRegisterError) {
      toast.error("Registration failed. Please try again.");
    }
  }, [isRegisterError]);

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("Login successful!");
    }
  }, [isLoginSuccess]);

  return (
    <div className="flex h-screen items-center justify-center text-white p-6 md:p-10 overflow-hidden">
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
