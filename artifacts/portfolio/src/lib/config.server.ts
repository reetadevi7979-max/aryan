// Server-only config stub. Original used node:process for SSR; this
// client-only build reads public config from import.meta.env instead.

export function getServerConfig() {
  return {
    nodeEnv: import.meta.env.MODE,
  };
}
