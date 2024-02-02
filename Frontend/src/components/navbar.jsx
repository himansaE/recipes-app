import { Link } from "react-router-dom";
import useAuth from "../lib/hooks/useAuth";
import { useState } from "react";
import Button from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const { loading, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  // state for mobile nav bar
  const [open, setOpen] = useState(false);
  return (
    <nav className="flex items-center justify-between sm:justify-start gap-10 shadow-md sticky top-0 z-20 bg-white">
      <Link
        to={"/"}
        title="homepage"
        className="py-2 px-5 flex gap-3 text-2xl items-center relative z-10"
      >
        <img src="/app_icon.webp" alt="logo image" height={40} width={104.8} />
      </Link>
      {!loading && (
        <div
          className={`gap-x-5 sm:flex hidden ${
            open
              ? " bg-white !flex flex-col sm:flex-row sm:static fixed top-0 left-0 sm:h-auto h-screen sm:w-auto w-screen sm:p-0 py-20 sm:px-0 px-5 gap-y-2"
              : ""
          }`}
        >
          {(isAuthenticated ? logged_nav_items : not_logged_nav_items).map(
            (i) => (
              <li key={i[0]} className="list-none">
                <Link
                  className="hover:underline"
                  to={i[1]}
                  onClick={() => setOpen(false)}
                >
                  {i[0]}
                </Link>
              </li>
            )
          )}
          <li className="list-none">
            <Link
              className="hover:underline"
              onClick={() => {
                setOpen(false);
                navigate(0);
              }}
            >
              Refresh
            </Link>
          </li>
        </div>
      )}
      <div className="mr-5 block sm:hidden">
        <Button
          onClick={() => {
            setOpen((i) => !i);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M4 18q-.425 0-.712-.288T3 17q0-.425.288-.712T4 16h16q.425 0 .713.288T21 17q0 .425-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12q0-.425.288-.712T4 11h16q.425 0 .713.288T21 12q0 .425-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7q0-.425.288-.712T4 6h16q.425 0 .713.288T21 7q0 .425-.288.713T20 8z"
            ></path>
          </svg>
        </Button>
      </div>
    </nav>
  );
};

const not_logged_nav_items = [
  ["Login", "/login"],
  ["Register", "/register"],
];
const logged_nav_items = [
  ["Recipes", "/"],
  ["Add Recipe", "/add"],
];
