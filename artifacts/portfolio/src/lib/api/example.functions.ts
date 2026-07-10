// Example API helper — converted from TanStack Start server function to a
// plain fetch call for the Vite client build.
export async function getGreeting({ name }: { name: string }) {
  return {
    greeting: `Hello, ${name}!`,
    mode: import.meta.env.MODE,
  };
}
