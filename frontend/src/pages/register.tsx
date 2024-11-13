import Navbar from "../components/app-shell";
import { RegisterForm } from "../components/auth/register-form";

export function RegisterPage() {
  return (
  <div>
    <Navbar/>
    <div className="">
        <RegisterForm />
      </div>
  </div>
  );
}