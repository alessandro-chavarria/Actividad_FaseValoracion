import express from "express";
import clientsRoutes from "./src/routes/clientsRoutes.js";
import reservationsRoutes from "./src/routes/reservationsRoutes.js";
import swaggerUI from "swagger-ui-express";
import fs from "fs";
import path from "path";

const app = express();

app.use(express.json());

const swaggerDocument = JSON.parse(fs.readFileSync(
    path.resolve(""),
    "utf-8")
  )
  
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use("/api/clients", clientsRoutes);
app.use("/api/reservations", reservationsRoutes);

export default app;