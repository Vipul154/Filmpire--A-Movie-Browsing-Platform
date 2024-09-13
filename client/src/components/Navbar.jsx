import { LogOut, Menu, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser.js";
import { useContentStore } from "../store/content.js";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const { setContentType } = useContentStore();
  //   console.log("Content Type : ", contentType)

  return (
    <>
      <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
        <div className="flex items-center gap-10 z-50">
          <Link to={"/"}>
            <img
              src="/netflix-logo.png"
              alt="Netflix Logo"
              className="w-32 sm:w-40"
            />
          </Link>

          {/* Desktop NavBar */}
          <div className="hidden sm:flex gap-2 items-center">
            <Link
              to={"/"}
              className="hover:underline"
              onClick={() => {
                setContentType("movie");
              }}
            >
              Movies
            </Link>
            <Link
              to={"/"}
              className="hover:underline"
              onClick={() => {
                setContentType("tv");
              }}
            >
              TV Shows
            </Link>
            <Link to={"/history"} className="hover:underline">
              Search History
            </Link>
          </div>
        </div>

        <div className="flex gap-2 items-center z-50">
          <Link to={"/search"}>
            <Search className="size-6 cursor-pointer" />
          </Link>
          <img
            src={user.image}
            alt="Avatar"
            className="h-8 rounded cursor-pointer"
          />
          <LogOut className="size-5 cursor-pointer" onClick={logout} />
        </div>

        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
        </div>

        {/* Mobile NavBar */}
        {isMobileMenuOpen && (
          <div className="w-full sm:hidden mt-4 z-50 bg-black rounded border-gray-800">
            <Link
              onClick={toggleMobileMenu}
              className="block hover:underline p-2"
              to={"/"}
            >
              Movies
            </Link>
            <Link
              onClick={toggleMobileMenu}
              className="block hover:underline p-2"
              to={"/"}
            >
              TV Shows
            </Link>
            <Link
              onClick={toggleMobileMenu}
              className="block hover:underline p-2"
              to={"/history"}
            >
              Search History
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
