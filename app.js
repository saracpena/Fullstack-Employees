import express from "express";
const app = express();
export default app;

app.use(express.json()); //convert incoming JSON req bodies into req.body

//Responds tp a GET request made to the APIs root path
app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

export default app;
