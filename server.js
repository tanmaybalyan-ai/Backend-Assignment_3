require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Inventory Management API is running",
    endpoints: {
      products: "/api/products",
      lowStock: "/api/products/low-stock",
      categorySummary: "/api/products/summary"
    }
  });
});

app.use("/api/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use(errorMiddleware);

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing. Add it to your .env file.");
    }
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error.message);
    process.exit(1);
  }
}

startServer();

module.exports = app;
