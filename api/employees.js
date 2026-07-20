import express from "express";
import { getEmployees } from "#db/queries/employees.js";
const router = express.Router();
export default router;

router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.send(employees);
  } catch (error) {
    next(error);
  }
});

export default router;