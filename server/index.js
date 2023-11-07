import fastify from "fastify";
import routes from "./routes/index.js";
import fastifyCors from "@fastify/cors";
import websockets from "@fastify/websocket";
import editorRoutes from "./routes/editorRoutes.js";

const server = fastify();

// Register the 'routes' plugin and wait for it to complete
server.register(routes).then(() => {
  server.register(fastifyCors, {
    // Set your CORS options here
    origin: "https://collab-code-57t1.vercel.app",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Set to true if you're dealing with cookies or authentication
  });

  //web socket connection
  server.register(websockets);
  server.register(async function (fastify) {
    editorRoutes(fastify);
  });

  // server.register(websockets);
  // Start the server once the plugin setup is done
  server.listen({ port: 3050 }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log("Server is running on port 3050");
  });
});
