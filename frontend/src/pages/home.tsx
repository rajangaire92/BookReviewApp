import { AppShell } from "../components/app-shell";
import { User } from "../components/auth/user";
import { ListBookHome } from "../components/book/list-book-home";

export const HomePage = () => {
  return (
    <div className="">
      <AppShell>
        <User />
        <ListBookHome></ListBookHome>
      </AppShell>
    </div>
  );
};