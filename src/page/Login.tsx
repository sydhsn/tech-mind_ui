import React, { useEffect } from "react";
import { LoginForm } from "../components/LoginForm";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/authApi";
import { useAuth } from "../components/AuthProvider";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [
    loginApiCall,
    { data: loginData, isSuccess: isLoginSuccess, isError: isLoginError },
  ] = useLoginMutation();

  const handleAuth = (data: {
    name?: string;
    email: string;
    password: string;
    isLogin: boolean;
  }) => {
    if (data.isLogin) {
      console.log("Logging in with:", data.email, data.password);
      // Call your login API here
      if (data.email && data.password) {
        loginApiCall({ email: data.email, password: data.password });
      }
    } else {
      console.log("Registering with:", data.name, data.email, data.password);
      // Call your register API here
    }
  };

  useEffect(() => {
    if (isLoginSuccess) {
      console.log("Login data:", loginData);
      login(loginData);
      navigate("/");
    }
    if (isLoginError) {
      console.log("Login error:", loginData);
      navigate("/login");
    }
  }, [loginData, isLoginSuccess, isLoginError, login, navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white p-6 md:p-10 overflow-hidden">
      <div className="w-full max-w-sm md:max-w-3xl p-8">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-12" />
        </div>
        <LoginForm onAuth={handleAuth} />
      </div>
    </div>
  );
};

export default Login;
