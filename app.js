import express from "express";
import { getEmployees } from "#db/queries/employees";
import employeesRouter from "./api/employees";
const app = express();
export default app;

app.use(express.json()); //convert incoming JSON req bodies into req.body

// Sends all /employees requests to the employee router.
app.use("/employees", employeesRouter);

//Responds tp a GET request made to the APIs root path
app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

export default app;
