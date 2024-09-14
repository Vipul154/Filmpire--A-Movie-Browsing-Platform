// Zustand is a global state management library, that will be used to store the state globally.
import axios from "axios";
import toast from "react-hot-toast";

import { create } from "zustand";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  IsLoggingOut: false,
  isLoggingIn: false,
  isCheckingAuth: true, //as the page reloads we check for the auth and show a loading just for a sec.
  signup: async (credentials) => {
    try {
      set({ isSigningUp: true });

      const response = await axios.post("/api/v1/auth/signup", credentials);

      // Show specific error messages based on response
      if (response.data.success === false) {
        const errorMessage = response.data.message;

        if (errorMessage.includes("Password")) {
          toast.error("Sorry, password is wrong.");
        } else if (errorMessage.includes("Email")) {
          toast.error("Email is invalid.");
        } else if (errorMessage.includes("Username")) {
          toast.error("Username already exists.");
        } else {
          toast.error("Server Busy. Try again later.");
        }
        set({ isSigningUp: false });
        return;
      }

      // Success scenario
      set({ user: response.data.user });
      toast.success("Account created successfully.");
      set({ isSigningUp: false });
    } catch (error) {
      // Handle server error if no response returned or unexpected errors
      if (!error.response) {
        toast.error("Server busy. Please try again later.");
      } else {
        toast.error(error.response.data.message || "Signup failed.");
      }
      set({ user: null, isSigningUp: false });
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Login Successful");
    } catch (error) {
      if (!error.response) {
        toast.error("Server busy. Please try again later.");
      } else {
        toast.error(
          error.response.data.message || "Login Failed. Invalid Credentials."
        );
      }
      set({ user: null, isLoggingIn: false });
    }
  },
  logout: async () => {
    set({ IsLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, IsLoggingOut: false });
      toast.success("Logout Successful");
    } catch (error) {
      set({ IsLoggingOut: false });
      toast.error(error.response.data.message || "Logout Failed.");
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });

    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      // console.log(error.response.data.messsage);
      set({ isCheckingAuth: false, user: null });
      // toast.error(
      //     error.response.data.messsage || "An error occurred, Signup failed...."
      //   );
    }
  },
}));

// We are creating a custom hook useAuthStore, using the create function. Whatever we return from the object becomes our global state.
// The benefit of zustand is that we can now go in any of the components, call this hook and get any of those values.
// Just watched a zustand tutorial of 19 minutes, but I will practice on it later also.
