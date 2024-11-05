import express from "express";
import { CategoriaController } from "../src/Controller/CategoriaController.js";

const categoriaRouter = express.Router();
const categoriaController = new CategoriaController();

categoriaRouter.get("/", categoriaController.getAll);
categoriaRouter.post("/cadastro", categoriaController.cadastro);
categoriaRouter.put("/:id", categoriaController.alterar);
categoriaRouter.delete("/:id", categoriaController.deletar);

export { categoriaRouter };
