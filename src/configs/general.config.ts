import dotenv from "dotenv";

dotenv.config();

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string | number): number | string | false {
  const port = typeof val === "string" ? parseInt(val, 10) : val;

  if (isNaN(port)) {
    return val; // Named pipe
  }

  if (port >= 0) {
    return port; // Port number
  }

  return false;
}

export const config = {
  port: normalizePort(process.env.PORT || 3000),
  // Add more configurations as needed
};
