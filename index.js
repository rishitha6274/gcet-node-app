import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const users = [];

app.listen(8080, () => {
  console.log("Server Started on port 8080");
});

app.get("/", (req, res) => {
  return res.json(users);
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  users.push({ name, email, password });
  return res.json({ message: "User registered successfully" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const found = users.find(
    (value) => value.email === email && value.password === password
  );
  if (!found) {
    return res.status(401).json({ message: "User not found" });
  }
  return res.json({ ...found, token: "123" });
});
