import express from "express";
import index from "../Routes/index.js";
import cors from "cors";

const app = express();

app.use("/imagem", express.static("./public/upload"));
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/", index);

export { app };
