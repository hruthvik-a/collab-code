import { editor, wsEditor } from "../controllers/editorController.js";
import { authenticateToken } from "../middlewares/authMiddlewares.js";
// import websocket

const editorRoutes = (fastify) => {
  fastify.get("/mouse-ws", { websocket: true }, wsEditor);
};

export default editorRoutes;
