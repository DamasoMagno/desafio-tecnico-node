import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()], // Isso faz o Vitest ler o seu baseUrl e paths do tsconfig
  test: {
    globals: true,
    fileParallelism: false,
    environment: "node",
  },
});
