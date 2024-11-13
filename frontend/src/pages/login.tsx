import Navbar from "../components/app-shell";
import { LoginForm } from "../components/auth/login-form";

export function LoginPage() {
  return (

     <div>
      <Navbar/>
       <div >
        <LoginForm />
      </div>
     </div>

  );
}