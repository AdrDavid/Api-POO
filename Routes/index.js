import express from "express";
// import { ImovelRouter } from "./ImovelRouter.js";
import { EscuderiaRouter } from "./EscuderiaRouter.js";
import { categoriaRouter } from "./CategoriaRouter.js";
import { pilotoRouter } from "./PilotoRouter.js";
import { carroRouter } from "./CarroRouter.js";
import { authRouter } from "./authRouter.js";
const router = express.Router();

router.use("/escuderias", EscuderiaRouter);
router.use("/categorias", categoriaRouter);
router.use("/pilotos", pilotoRouter);
router.use("/carros", carroRouter);
router.use("/auth", authRouter);

export default router;
