import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
    setLoginError("");

    if (!email) {
      setEmailError("Please enter your email.");
      return;
    }
    if (!password) {
      setPasswordError("Please enter your password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in Successfully");
      navigate("/notes");
    } catch (error) {
      console.log(error.code);

      if (error.code === "auth/user-not-found") {
        setEmailError("Email not found. Please check your email.");
      } else if (error.code === "auth/wrong-password") {
        setPasswordError("Incorrect password. Please try again.");
      } else if (error.code === "auth/too-many-requests") {
        setLoginError("Too many login attempts. Please try again later.");
      } else {
        setLoginError(
          "Login failed. Please check your credentials and try again."
        );
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-pink-500">
      <div className="w-full max-w-sm mx-auto rounded-lg p-6 bg-stone-800 text-white ">
        <div className="flex flex-col items-center">
          <h2 className="mb-8 text-3xl font-bold">Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 mb-4 rounded-md focus:outline-none border ${
              emailError ? "p-2 border-2 border-red-500" : "border-gray-300"
            } bg-white text-black text-base`}
          />

          {emailError && (
            <p className="text-red-500 text-base mb-4">{emailError}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 mb-4 rounded-md focus:outline-none border ${
              passwordError ? "p-2 border-2 border-red-500" : "border-gray-300"
            } bg-white text-black text-base`}
          />

          {passwordError && (
            <p className="text-red-500 text-base mb-4">{passwordError}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full p-3 bg-green-500 hover:bg-green-600 rounded-md text-white font-semibold text-base mb-4"
          >
            Login
          </button>

          {loginError && (
            <p className="text-red-500 text-base mt-4">{loginError}</p>
          )}

          <p className="mt-4 text-base text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
