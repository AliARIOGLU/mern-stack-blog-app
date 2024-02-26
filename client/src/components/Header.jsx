import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Navbar, TextInput, Dropdown, Avatar } from "flowbite-react";

import { headerLinks } from "../constants";
import { useSignOut } from "../lib/mutations";
import { useTheme } from "../redux/theme/themeActions";
import { setTheme } from "../redux/theme/themeActions";
import { useCurrentUser } from "../redux/user/userActions";

export const Header = () => {
  const { currentUser } = useCurrentUser();
  const [searchTerm, setSearchTerm] = useState("");

  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const signOutMutation = useSignOut();

  const handleSignOut = async () => {
    await signOutMutation.mutateAsync();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }

    return () => {
      setSearchTerm("");
    };
  }, [location.search]);

  return (
    <Navbar className="border-b-2 sticky z-50 top-0">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Codex&apos;s
        </span>
        Blog
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button
        className="w-12 h-10 lg:hidden"
        onClick={() => {}}
        color="gray"
        pill
      >
        <AiOutlineSearch onClick={() => navigate("/search")} />
      </Button>
      <div className="flex gap-8 md:order-2 items-center">
        <Button
          onClick={() => setTheme()}
          className="w-12 h-10 hidden sm:inline relative focus:ring-0 transition-all duration-300"
          color="gray"
          pill
        >
          {theme === "light" ? (
            <FaMoon
              size={20}
              className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-black"
            />
          ) : (
            <FaSun
              size={20}
              className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-amber-500"
            />
          )}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {headerLinks.map((link) => (
          <Navbar.Link
            active={location.pathname === link.path}
            key={link.id}
            as={"div"}
          >
            <Link className="font-bold" to={link.path}>
              {link.title}
            </Link>
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};
