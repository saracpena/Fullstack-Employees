import db from "../client.js";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  // Inserts one employee safely and returns the newly created database record.

  /*Understanding $1, $2, $3 placeholders which PREVENTS SQL INJECTION!
  $1 → name       → first array value
  $2 → birthday   → second array value
  $3 → salary     → third array value*/
  const result = await db.query(
    `
      INSERT INTO employees (name, birthday, salary)
      VALUES ($1, $2, $3) 
      RETURNING *;
    `,
    [name, birthday, salary],
  );

  return result.rows[0]; //returns that one employee object.
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  const SQL = `
    SELECT *
    FROM employees;
  `;

  const response = await db.query(SQL);
  return response.rows; //returns array of employees VS [0] returns the first employee object
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  // Finds one employee safely by their unique ID.
  const SQL = `
    SELECT *
    FROM employees
    WHERE id = $1;
  `;
  /* $1   → first supplied value
[id] → the value supplied for $1 */

  const response = await db.query(SQL, [id]);

  return response.rows[0];
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  const SQL = `
    UPDATE employees
    SET
      name = $2,
      birthday = $3,
      salary = $4
    WHERE id = $1
    RETURNING *;
  `;
// $1, $2, etc. are placeholders matching the values array in the same order.

  const response = await db.query(SQL, [id, name, birthday, salary]);

  return response.rows[0];
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  // Deletes the employee matching the provided ID and returns the deleted record.
  const SQL = `
    DELETE FROM employees
    WHERE id = $1
    RETURNING *;
  `;

  const response = await db.query(SQL, [id]);

  return response.rows[0];
}