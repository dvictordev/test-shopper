import { FastifyInstance } from "fastify";
import { uploadController } from "./controller/upload.controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/upload", uploadController);
}
