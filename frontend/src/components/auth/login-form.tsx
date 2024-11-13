import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useLoginUserMutation } from "../../api/auth/query";
import { successToast, errorToast } from "../toaster";
import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(25),
});

const quotes = [
  "“A room without books is like a body without a soul.” – Cicero",
  "“Books are a uniquely portable magic.” – Stephen King",
  "“So many books, so little time.” – Frank Zappa",
  "“A book is a dream that you hold in your hand.” – Neil Gaiman",
];

export function LoginForm() {
  const navigate = useNavigate();
  const loginUserMutation = useLoginUserMutation();
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
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = (data) => {
    try {
      loginUserMutation.mutateAsync(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess(data) {
            successToast(data.message);
            reset();
            navigate("/");
          },
          onError(error) {
            console.error("error", error);
            errorToast(error.message);
          },
        }
      );
    } catch (error) {
      console.error("error", error);
      errorToast("Something went wrong.");
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
      {/* Background Book Images and Quotes */}
      <div className="absolute inset-0 grid grid-cols-2 gap-4 opacity-80 pointer-events-none">
        <div className="flex items-center justify-center text-center text-white text-lg italic p-6 bg-black bg-opacity-50">
          <p>{quotes[currentQuoteIndex]}</p>
        </div>
        <div className="flex items-center justify-center text-center text-white text-lg italic p-6 bg-black bg-opacity-50">
          <p>{quotes[(currentQuoteIndex + 1) % quotes.length]}</p>
        </div>
      </div>

      {/* Decorative Book Image Background */}
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-fixed opacity-30 " style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')`,
        }}
      />

      {/* Main Form Container */}
      <div className="relative z-10 bg-white bg-opacity-90 rounded-2xl shadow-2xl p-12 max-w-lg w-full transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Welcome Back
        </h2>
        <p className="text-md text-gray-700 text-center mb-8">
          Login to continue to your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link className="text-purple-600 underline" to="/register">
                Register
              </Link>
            </p>
          </div>

          <button
            type="submit"
            className="mt-6 w-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-md hover:from-purple-600 hover:to-indigo-700 transition-colors duration-300"
            disabled={loginUserMutation.isPending}
          >
            {loginUserMutation.isPending ? (
              "Logging in..."
            ) : (
              <>
                <FaSignInAlt />
                Login
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
