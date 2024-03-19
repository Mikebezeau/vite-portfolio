import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const APP_URL = "https://portfolio.blackbirdtech.ca/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: APP_URL,
});
