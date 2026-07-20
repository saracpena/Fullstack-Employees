import express from "express";
import { getEmployees, createEmployee, getEmployee, deleteEmployee, updateEmployee } from "#db/queries/employees";
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

// Validates the request, creates an employee, and returns it with status 201.
router.post("/", async (req, res, next) => {
  try {
    if (!req.body) {
      return res.sendStatus(400);
    }

    const { name, birthday, salary } = req.body;

    if (!name || !birthday || salary === undefined) {
      return res.sendStatus(400);
    }

    const employee = await createEmployee({ name, birthday, salary });

    res.status(201).send(employee);
  } catch (error) {
    next(error);
  }
});

// Finds an employee using the ID supplied in the URL.
router.get("/:id", async (req, res, next) => {
  try {
    const employee = await getEmployee(req.params.id);

    if (!employee) {
      return res.sendStatus(404);
    }

    res.send(employee);
  } catch (error) {
    next(error);
  }
});

// Deletes the employee matching the ID supplied in the URL.
router.delete("/:id", async (req, res, next) => {
  try {
    const employee = await deleteEmployee(req.params.id);

    if (!employee) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Validates the request and updates the employee matching the URL ID.
router.put("/:id", async (req, res, next) => {
  try {
    if (!req.body) {
      return res.sendStatus(400);
    }

    const { name, birthday, salary } = req.body;

    if (!name || !birthday || salary === undefined) {
      return res.sendStatus(400);
    }

    const employee = await updateEmployee({
      id: req.params.id,
      name,
      birthday,
      salary,
    });

    if (!employee) {
      return res.sendStatus(404);
    }

    res.status(200).send(employee);
  } catch (error) {
    next(error);
  }
});

export default router;