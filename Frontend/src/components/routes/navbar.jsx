import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="flex items-center gap-10 shadow-md sticky top-0 z-10 bg-white">
      <Link
        to={"/"}
        title="homepage"
        className="py-2 px-5 flex gap-3 text-2xl items-center"
      >
        <img src="/app_icon.webp" alt="logo image" height={40} width={104.8} />
      </Link>
      <div className="flex gap-5">
        {nav_items.map((i) => (
          <li key={i[0]} className="list-none">
            <Link className="hover:underline" to={i[1]}>
              {i[0]}
            </Link>
          </li>
        ))}
      </div>
    </nav>
  );
};

const nav_items = [
  ["Login", "/login"],
  ["Register", "/register"],
];
