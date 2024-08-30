import { FastifyInstance } from "fastify";
import { uploadController } from "./controller/upload.controller";
import { confirmController } from "./controller/confirm.controller";
import { getMeasuresController } from "./controller/get-measures-controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/upload", uploadController);
  app.patch("/confirm", confirmController);
  app.get("/:customer_code/list", getMeasuresController);
}
