import { defineCliConfig } from "sanity/cli";

// `studioHost` fixes the hosted subdomain used by `sanity deploy`, so the admin
// panel lands at https://spine-blog.sanity.studio with no interactive prompt.
// If that host is taken, change it here (or run `sanity deploy` and pick another).
export default defineCliConfig({
  api: {
    projectId: "r2fgeqld",
    dataset: "production",
  },
  studioHost: "spine-blog",
  autoUpdates: true,
});
