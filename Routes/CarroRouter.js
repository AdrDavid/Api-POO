import express from "express";
import { CarroController } from "../src/Controller/CarroController.js";

const carroRouter = express.Router();
const carroController = new CarroController();

carroRouter.get("/", carroController.getAll);
carroRouter.post("/cadastro", carroController.cadastro);
carroRouter.put("/:id", carroController.alterar);
carroRouter.delete("/:id", carroController.deletar);

export { carroRouter };
