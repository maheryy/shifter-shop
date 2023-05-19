import "config";
import express from "express";
import cors from "cors";
import mailer from "routes/mailer";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(mailer);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
