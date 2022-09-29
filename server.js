const express = require("express");
const app = express();
const port = 4098;

const userRouter = require("./routers/userRouter");
const blogRouter = require("./routers/blogRouter");
const commentRouter = require("./routers/commentRouter");
const likeRouter = require("./routers/likeRouter");

//middlewares
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Testing, Testing, Testing");
});

app.use("/blogapi", userRouter);
app.use("/blogapi", blogRouter);
app.use("/blogapi", commentRouter);
app.use("/blogapi", likeRouter);

//connect to Database
const mongoose = require("mongoose");
const url = "mongodb://localhost/blogDB";

mongoose
  .connect(url)
  .then((x) => {
    console.log("connected..............");
    app.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  })
  .catch(() => {
    console.log("connection failed");
  });
