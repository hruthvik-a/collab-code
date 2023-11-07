import { createUser, userLogin } from "../controllers/userController.js";
import { createToken } from "../middlewares/authMiddlewares.js";

const userRoutes = async (fastify) => {
  fastify.post("/register", createUser);
  fastify.post("/login", { preHandler: userLogin }, createToken);
};

export default userRoutes;
