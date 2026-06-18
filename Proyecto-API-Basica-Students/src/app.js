import express from "express";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { requestLogger } from "./middlewares/loggingMiddleware.js";
import { errorHandler, responseFormatter } from "./middlewares/formatingMiddleware.js";
import { connectDB } from "./data/mongoConnection.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import * as OpenApiValidator from "express-openapi-validator";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

await connectDB();

const openApiDocument = YAML.load("./src/docs/openapi.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.use(express.json());

app.use(requestLogger);

app.use(responseFormatter);

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Hello from Express</h1>");
});

app.use("/api/users", userRoutes);

app.use(
  OpenApiValidator.middleware({
    apiSpec: "./src/docs/openapi.yaml",
    validateRequests: true,
    validateResponses: false
  })
);

app.use("/api/students", studentRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});