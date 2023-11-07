import userRoutes from "./authRoutes.js";
import editorRoutes from "./editorRoutes.js";

const routes = async (fastify) => {
  userRoutes(fastify);
  // editorRoutes(fastify);
};

export default async (fastify) => {
  fastify.register(routes);
};
