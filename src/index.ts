import { HttpError } from "http-errors";
import app from "./app";
import { config } from "./config";
import debug from "debug";
import http from "http";
import prisma from "./prisma";

const PORT = normalizePort(config.port || "3000");
const debugs = debug("blog-api:server");

/**
 * Set the port in the Express app.
 */
app.set("port", PORT);

/**
 * Create an HTTP server using the Express app.
 */
const server = http.createServer(app);

/**
 * Start listening on the provided port, on all network interfaces.
 */
server.listen(PORT);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Ensure the Prisma Client disconnects when your server shuts down
 */
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

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

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: HttpError): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? `Pipe ${PORT}` : `Port ${PORT}`;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
  debugs(`Listening on ${bind}`);
}
