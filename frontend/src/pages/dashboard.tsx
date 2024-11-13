

import Navbar from "../components/app-shell";
import { CreateBook } from "../components/book/create-book";
import { ListBooks } from "../components/book/list-book";

export function DashboardPage() {
  return(


<div>
  <Navbar/>
  <CreateBook />
  <ListBooks />
 
</div>

  );
}