import "dotenv/config";
import express from "express";
import cors from "cors";
import { PORT } from "./config/environment";
import { router } from "./router";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => console.log(`Servidor iniciado em http://localhost:${PORT}`))