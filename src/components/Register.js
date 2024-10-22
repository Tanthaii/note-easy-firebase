import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!email.includes("@")) {
      setEmailError("Email must include '@'.");
      return;
    }

    if (!email || !password || !confirmPassword) {
      if (!email) setEmailError("Email is required.");
      if (!password) setPasswordError("Password is required.");
      if (!confirmPassword)
        setConfirmPasswordError("Confirm password is required.");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration Successful");
      navigate("/notes");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setEmailError(
          "This email is already in use. Please use another email."
        );
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <div className="w-full max-w-sm mx-auto rounded-lg p-6 bg-stone-800 text-white ">
        <div className="flex flex-col items-center">
          <h2 className="mb-8 text-3xl font-bold">Register</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 mb-4 rounded-md focus:outline-none border ${
              emailError ? "p-2 border-2 border-red-500" : "border-gray-300"
            } bg-white text-black`}
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
            } bg-white text-black`}
          />

          {passwordError && (
            <p className="text-red-500 text-base mb-4">{passwordError}</p>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full p-3 mb-4 rounded-md focus:outline-none border ${
              confirmPasswordError
                ? "p-2 border-2 border-red-500"
                : "border-gray-300"
            } bg-white text-black`}
          />

          {confirmPasswordError && (
            <p className="text-red-500 text-base mb-4">
              {confirmPasswordError}
            </p>
          )}

          <button
            onClick={handleRegister}
            className="w-full p-3 bg-green-500 hover:bg-blue-600 rounded-md text-white font-semibold text-base"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
