import express from "express";
import "./db";
import generosRouter from "./router/generos";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/generos", generosRouter);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});