import express, { urlencoded, json } from "express";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import cors from "cors";
import helmet from "helmet";
import multer from "multer";
const upload = multer();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.ORIGIN;
// const databaseRouter = require("./routes/database");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors({ origin: ORIGIN }));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(upload.array());

app.use(express.static(resolve(__dirname, "../client/build")));

// app.use("/database", databaseRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
