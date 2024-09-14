import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { envVars } from "../server/config/envVars";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: envVars.API_URL,
        //Whenever we use /api, it's gonna prefix it with target value.
      },
    },
  },
});
