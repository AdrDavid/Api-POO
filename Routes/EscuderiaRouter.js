import express from "express";
import multer from "multer";
import path from "path";
import { app } from "../src/app.js";

import { escuderiaController } from "../src/Controller/EscuderiaController.js";

const EscuderiaRouter = express.Router();

const EscuderiaController = new escuderiaController();

EscuderiaRouter.get("/", EscuderiaController.getAll);
EscuderiaRouter.post("/cadastro", EscuderiaController.cadastro);
EscuderiaRouter.put("/:id", EscuderiaController.alterar);
EscuderiaRouter.delete("/:id", EscuderiaController.deletar);
EscuderiaRouter.put("/:id/pontos", EscuderiaController.atualizarPontos);
export { EscuderiaRouter };
