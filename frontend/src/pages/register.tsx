import { AppShell } from "../components/app-shell";
import { RegisterForm } from "../components/auth/register-form";

export const RegisterPage = () => {
  return (
    <div className="">
      <AppShell>
      <RegisterForm />
      </AppShell>
      {/* <Toaster /> */}
    </div>
  );
};