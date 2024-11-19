// import { Link, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMeUserQuery } from "../../api/auth/query";
import clsx from "clsx";

const logreg = [
  { name: "Login ", href: "/login", current: false },
  { name: "/", href: "", current: false },
  { name: "Register", href: "/register", current: false },
];

export const User = () => {
  //   const navigate = useNavigate();
  const { data, isLoading, isError } = useMeUserQuery();

  if (isLoading) {
    return <div>loading....</div>;
  }
  if (isError) {
    return (
      <>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            {logreg.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                aria-current={item.current ? "page" : undefined}
                className={clsx(
                  item.current
                    ? "bg-amber-900 text-white w-56"
                    : "text-white hover:bg-amber-500 hover:text-white",
                  "rounded-md px-3 py-2 text-sm font-medium"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (!data) {
    return <div>No data</div>;
  }

  const { username } = data.data; // Destructure the user data from the query result

  return (
    <div className="flex items-center w-28">
      {/* <img
        alt={username}
        src="/Account.png" // You can use a service like Hello Avatar or replace it with your own avatar image URL
        className="h-8 w-8 rounded-full"
      /> */}
      <span className="ml-3 font-medium text-black">{username}</span>{" "}
      {/* Display the username from the backend */}

    </div>
  );
};