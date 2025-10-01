import React, { useState } from "react";

function LoginRegister() {
  const [mode, setMode] = useState("login"); // "login" | "register" | "forgot"

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {mode === "login" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded"
              >
                Login
              </button>
            </form>
            <div className="flex justify-between mt-4 text-sm">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setMode("forgot")}
              >
                Forgot password?
              </button>
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setMode("register")}
              >
                Register
              </button>
            </div>
          </>
        )}

        {mode === "register" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-3 py-2 border rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded"
              >
                Register
              </button>
            </form>
            <div className="flex justify-between mt-4 text-sm">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setMode("login")}
              >
                Already have an account? Login
              </button>
            </div>
          </>
        )}

        {mode === "forgot" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded"
              >
                Send Reset Link
              </button>
            </form>
            <div className="flex justify-between mt-4 text-sm">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setMode("login")}
              >
                Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginRegister;
