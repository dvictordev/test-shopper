import fastify from "fastify";
import { appRoutes } from "./http/routes";
import path from "path";

export const app = fastify({
  bodyLimit: 10485760,
});

app.register(appRoutes);
