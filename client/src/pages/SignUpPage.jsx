import { useState } from "react";
import { Link } from "react-router-dom";
// import {useNavigate} from 'react-router-dom;
import { useAuthStore } from "../store/authUser";

const SignUpPage = () => {
  // const navigate = useNavigate();
  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");

  const [email, setEmail] = useState(emailValue || "");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email, username, password);
    signup({ email, username, password });
    // navigate("/");
  };
  return (
    <>
      <div className="h-screen w-full hero-bg">
        <header className="max-w-6xl mx-auto flex justify-between p-4">
          <Link to={"/"}>
            <img src="/netflix-logo.png" alt="logo" className="w-52" />
          </Link>
        </header>

        <div className="flex justify-center items-center mt-20 mx-3 ">
          <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md  ">
            <h1 className="text-center text-white text-2xl font-bold mb-4">
              {" "}
              Sign Up
            </h1>
            <form action="" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300 block"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                  placeholder="you@exmaple.com"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-300 block"
                >
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                  placeholder="Enter Name"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300 block"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                  placeholder="**********"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="w-full bg-red-600 py-2 rounded-md text-white hover:bg-red-700"
                disabled={isSigningUp}
              >
                {isSigningUp ? "Loading..." : "Sign Up"}
              </button>
            </form>
            <div className="text-gray-400 text-center">
              Already a member?{" "}
              <Link to={"/login"} className="text-red-500 hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default SignUpPage;
