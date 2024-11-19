// import { Toaster } from "react-hot-toast";
import { AppShell } from "../components/app-shell";
import { LoginForm } from "../components/auth/login-form";

export const LoginPage = () => {
  return (
    <div className="">
    <AppShell>
    <LoginForm />
    </AppShell>
      {/* <Toaster /> */}
    </div>
  );
};