import { FastifyInstance } from "fastify";
import { uploadController } from "./controller/upload.controller";
import { confirmController } from "./controller/confirm.controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/upload", uploadController);
  app.patch("/confirm", confirmController);
}
