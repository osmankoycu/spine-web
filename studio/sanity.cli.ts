import { defineCliConfig } from "sanity/cli";

// `studioHost` fixes the hosted subdomain used by `sanity deploy`, so the admin
// panel lands at https://joinspine-blog.sanity.studio with no interactive prompt.
// If that host is taken, change it here (or run `sanity deploy` and pick another).
export default defineCliConfig({
  api: {
    projectId: "r2fgeqld",
    dataset: "production",
  },
  studioHost: "joinspine-blog",
  autoUpdates: true,
  deployment: {
    // The hosted Studio app (https://joinspine-blog.sanity.studio) — pinned so
    // `sanity deploy` never re-prompts for the application id.
    appId: "rbkxrhv91mssp5udir4pwy24",
  },
});
