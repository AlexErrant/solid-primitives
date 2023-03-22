import { defineConfig } from "vite";
import devtools from "solid-devtools/vite";
import solid from "solid-start/vite";
// @ts-ignore
import staticAdapter from "solid-start-static";

let packages: string[] = [];
try {
  packages = await import("./src/_generated/packages.json");
} catch (e) {
  throw new Error("No packages found. Did you run `pnpm generate`?");
}

export default defineConfig(() => {
  return {
    plugins: [
      devtools({
        autoname: true,
        locator: {
          componentLocation: true,
          targetIDE: "vscode",
        },
      }),
      solid({
        adapter: staticAdapter(),
        prerenderRoutes: ["/", ...packages.map(name => `/package/${name}`)],
      }),
    ],
  };
});
