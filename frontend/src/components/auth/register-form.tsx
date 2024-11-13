import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useRegisterUserMutation } from "../../api/auth/query";
import { errorToast, successToast } from "../toaster";
import { useEffect, useState } from "react";

const registerSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(3).max(20),
    password: z.string().min(6).max(25),
    confirmPassword: z.string().min(6).max(25),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const quotes = [
  "“A reader lives a thousand lives before he dies.” – George R.R. Martin",
  "“Reading gives us someplace to go when we have to stay where we are.” – Mason Cooley",
  "“Today a reader, tomorrow a leader.” – Margaret Fuller",
  "“Once you learn to read, you will be forever free.” – Frederick Douglass",
];

export function RegisterForm() {
  const navigate = useNavigate();
  const registerUserMutation = useRegisterUserMutation();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = (data) => {
    try {
      registerUserMutation.mutateAsync(
        {
          email: data.email,
          username: data.username,
          password: data.password,
        },
        {
          onSuccess(data) {
            successToast(data.message);
            reset();
            navigate("/login");
          },
          onError(error) {
            console.error("error", error);
            errorToast(error.message);
          },
        }
      );
    } catch (error) {
      console.error("error", error);
      errorToast("Something went wrong");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 relative overflow-hidden">
      {/* Background Quotes */}
      <div className="absolute inset-0 grid grid-cols-2 gap-4 opacity-80 pointer-events-none">
        <div className="flex items-center justify-center text-center text-white text-lg italic p-6 bg-black bg-opacity-50">
          <p>{quotes[currentQuoteIndex]}</p>
        </div>
        <div className="flex items-center justify-center text-center text-white text-lg italic p-6 bg-black bg-opacity-50">
          <p>{quotes[(currentQuoteIndex + 1) % quotes.length]}</p>
        </div>
      </div>

      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1528744598421-b7d6d8f3913c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')`,
        }}
      />

      {/* Main Form Container */}
      <div className="relative z-10 bg-white bg-opacity-90 rounded-2xl shadow-2xl p-12 max-w-lg w-full transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Create Your Account
        </h2>
        <p className="text-md text-gray-700 text-center mb-8">
          Register for a free account and join our community.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-lg font-medium text-gray-900">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="block w-full mt-2 p-4 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-900">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="block w-full mt-2 p-4 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-900">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="block w-full mt-2 p-4 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-lg font-medium text-gray-900">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              className="block w-full mt-2 p-4 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link className="text-purple-600 underline" to="/login">
                Login
              </Link>
            </p>
          </div>

          <button
            type="submit"
            className="mt-6 w-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-md hover:from-purple-600 hover:to-indigo-700 transition-colors duration-300"
            disabled={registerUserMutation.isPending}
          >
            {registerUserMutation.isPending ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
