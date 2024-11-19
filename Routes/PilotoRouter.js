import express from "express";
import { PilotoController } from "../src/Controller/PilotoController.js";

const pilotoRouter = express.Router();
const pilotoController = new PilotoController();

pilotoRouter.get("/", pilotoController.getAll);
pilotoRouter.post("/cadastro", pilotoController.cadastro);
pilotoRouter.put("/:id", pilotoController.alterar);
pilotoRouter.delete("/:id", pilotoController.deletar);
pilotoRouter.put("/:id/pontos", pilotoController.atualizarPontos);
pilotoRouter.get("/:id", pilotoController.getById);
export { pilotoRouter };
