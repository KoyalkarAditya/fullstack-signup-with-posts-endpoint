import express from "express";
import cors from "cors";
import rootRouter from "./routes";
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;
app.use("/api/v1", rootRouter);
app.get("/", (req, res) => {
  return res.json({
    msg: "Hello",
  });
});
app.listen(PORT, () => {
  console.log("Listening at port::", PORT);
});
