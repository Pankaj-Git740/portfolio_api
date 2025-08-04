const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes");

const app = express();
app.use(express.json());

// Routes
app.use("/api/v1", router);

app.use((err, req, res, next) => {
  console.error(err.stack);

  const status = err.status ?? 500;
  const message = err.message ?? "internal server error";

  res.status(status).json({
    success: false,
    message,
    error: NODE_ENV === "developement" ? err.stack : undefined,
  });
});

mongoose
  .connect(process.env.DB_KEY)
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
    console.log(process.env.DB_KEY);
  })
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log("server is running... https://localhost:" + process.env.PORT);
});
