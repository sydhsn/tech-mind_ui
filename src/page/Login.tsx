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
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginMutation();

  const [
    registerApiCall,
    {
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterMutation();

  const handleAuth = useCallback(
    (data: {
      name?: string;
      email: string;
      password: string;
      isLogin: boolean;
    }) => {
      const { name, email, password, isLogin: isLoginMode } = data;

      if (!email || !password || (!isLoginMode && !name)) {
        toast.error("Please fill in all fields");
        return;
      }

      if (isLoginMode) {
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

  // Handle login success
  useEffect(() => {
    if (isLoginSuccess && loginData) {
      const { user, accessToken, refreshToken } = loginData;

      if (user && accessToken && refreshToken) {
        login({ user, accessToken, refreshToken }); // Dispatch login action
        toast.success("Login successful!");
        navigate("/");
      }
    }
  }, [isLoginSuccess, loginData, login, navigate]);

  // Handle errors
  useEffect(() => {
    if (isLoginError) {
      toast.error(
        loginError && "data" in loginError
          ? loginError.data.message
          : "Login failed. Please check your credentials."
      );
    }
    if (isRegisterError) {
      toast.error(
        registerError && "data" in registerError
          ? registerError.data.message
          : "Registration failed. Please try again."
      );
    }
  }, [isLoginError, isRegisterError, loginError, registerError]);

  // Handle registration success
  useEffect(() => {
    if (isRegisterSuccess) {
      toast.success("Registration successful! Please login.");
      setIsLogin(true);
    }
  }, [isRegisterSuccess]);

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
