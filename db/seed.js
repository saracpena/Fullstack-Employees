import db from "#db/client";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  // Creates the initial employee records in the database.
  const employees = [
    { name: "Alice Johnson", birthday: "1990-03-15", salary: 65000 },
    { name: "Brian Smith", birthday: "1987-07-22", salary: 72000 },
    { name: "Carla Davis", birthday: "1994-11-08", salary: 58000 },
    { name: "Daniel Brown", birthday: "1985-01-19", salary: 81000 },
    { name: "Elena Garcia", birthday: "1992-05-27", salary: 69000 },
    { name: "Frank Wilson", birthday: "1989-09-12", salary: 75000 },
    { name: "Grace Lee", birthday: "1996-02-03", salary: 61000 },
    { name: "Henry Miller", birthday: "1983-12-14", salary: 88000 },
    { name: "Isabel Moore", birthday: "1991-06-30", salary: 70000 },
    { name: "James Taylor", birthday: "1993-10-05", salary: 67000 },
  ];

  // Sends each employee to createEmployee and waits for all inserts to finish.
  await Promise.all(employees.map(createEmployee));
}