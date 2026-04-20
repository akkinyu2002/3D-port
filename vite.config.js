import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function getPackageName(id) {
  const normalizedId = id.replaceAll("\\", "/");
  const modulePath = normalizedId.split("/node_modules/")[1];

  if (!modulePath) {
    return null;
  }

  const parts = modulePath.split("/");
  return parts[0].startsWith("@") ? `${parts[0]}/${parts[1]}` : parts[0];
}

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const packageName = getPackageName(id);

          if (!packageName) {
            return undefined;
          }

          return `vendor-${packageName.replace("@", "").replace("/", "-")}`;
        },
      },
    },
  },
});
