import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../api/auth/query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorToast, successToast } from "../toaster";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(25),
});

export const LoginForm = () => {
  const navigate = useNavigate();
  const loginUserMutation = useLoginUserMutation();

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
      errorToast("something went wrong");
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#F3EEEA] to-[#EBE3D5] min-h-screen flex items-center justify-center">
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-xl rounded-lg p-8 w-[400px] border border-gray-300">
        <h2 className="text-white text-3xl font-extrabold text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-2">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-300 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {loginUserMutation.isPending ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-white">
          Don't have an account?{" "}
          <Link to="/register" className="text-yellow-300 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
