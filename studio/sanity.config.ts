import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

// Standalone Studio for the Spine blog. Runs on Vite (fast), deploys to Sanity
// hosting (spine-blog.sanity.studio) — decoupled from the Next.js app build.
export default defineConfig({
  name: "default",
  title: "Spine",
  projectId: "r2fgeqld",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
