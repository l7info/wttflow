import dotenv from "dotenv";
import { initializeTypeORM } from "./config/typeorm";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

// Inicializa o TypeORM
initializeTypeORM();
