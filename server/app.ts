import express from "express";
import cors from "cors";
import path from "path";
import router from "./routes";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// API Rotalarını bağlıyoruz
app.use("/api", router);

// Render üzerinde Frontend (React) build dosyalarını sunmak için
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve("dist/public")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("dist/public/index.html"));
  });
}

export default app;
