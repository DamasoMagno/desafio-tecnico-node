import express from "express";
const app = express();

import { connectToDatabase } from "./database/index.js";
import { userRoutes } from "./routes/user.js";

connectToDatabase()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

app.use(express.json());
app.use(userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
