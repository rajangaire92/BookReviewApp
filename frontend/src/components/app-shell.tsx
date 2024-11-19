import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";
import { Logout } from "./auth/logout";
import { User } from "./auth/user";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
];

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();

  return (
    <div className="bg-gradient-to-br from-[#F3EEEA] to-[#EBE3D5] min-h-screen flex flex-col">
      <Disclosure
        as="nav"
        className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo and Title */}
                <div className="flex items-center">
                  <Link
                    to="/"
                    className="flex items-center bg-white text-purple-600 px-4 py-2 rounded-full shadow-md font-extrabold text-lg hover:bg-gray-100 transition duration-300"
                  >
                    <img
                      className="h-8 w-8 rounded-full mr-2"
                      src="/placeholder.svg?height=32&width=32"
                      alt="Book Review App"
                    />
                    Book Review App
                  </Link>
                </div>

                {/* Central Quote */}
                <div className="hidden md:block flex-grow text-center text-white italic text-lg">
                  "A room without books is like a body without a soul."
                </div>

                {/* Links: Home and Dashboard */}
                <div className="hidden md:flex space-x-4">
                  <Link
                    to="/"
                    className={clsx(
                      location.pathname === "/"
                        ? "bg-purple-500 text-white"
                        : "text-white hover:bg-pink-500 hover:text-white",
                      "px-4 py-2 rounded-md text-sm font-medium"
                    )}
                  >
                    Home
                  </Link>
                  <Link
                    to="/dashboard"
                    className={clsx(
                      location.pathname === "/dashboard"
                        ? "bg-purple-500 text-white"
                        : "text-white hover:bg-pink-500 hover:text-white",
                      "px-4 py-2 rounded-md text-sm font-medium"
                    )}
                  >
                    Dashboard
                  </Link>
                </div>

                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-white text-purple-600 px-4 py-2 shadow-md hover:bg-gray-100 transition duration-300">
                          <span className="sr-only">Open user menu</span>
                          <UserCircleIcon
                            className="h-8 w-8"
                            aria-hidden="true"
                          />
                          <User />
                        </MenuButton>
                      </div>
                      <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <MenuItem>
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-500 hover:text-white">
                              <Logout />
                            </a>
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </div>
                </div>

                <div className="-mr-2 flex md:hidden">
                  <DisclosureButton className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
              </div>
            </div>

            <DisclosurePanel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={clsx(
                      location.pathname === item.href
                        ? "bg-purple-500 text-white"
                        : "text-gray-200 hover:bg-pink-500 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={
                      location.pathname === item.href ? "page" : undefined
                    }
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>

      <main className="flex-1 py-12 px-6">
        <div className="mx-auto max-w-7xl">{children}</div>
        <Toaster />
      </main>

      {/* Footer with Gradient Theme */}
      <footer className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-inner mt-auto">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">Book Review App</h2>
            <p className="text-sm italic">
              "A room without books is like a body without a soul."
            </p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              to="/"
              className="text-white text-sm hover:underline transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-white text-sm hover:underline transition duration-300"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
