import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const users = [];

app.get("/", (req, res) => {
  return res.json(users);
});

app.post("/register", (req, res, next) => {
  try {
    console.log("Register request body:", req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    users.push({ name, email, password });
    return res.json({ message: "User registered successfully" });
  } catch (err) {
    next(err); 
  }
});


app.post("/login", (req, res, next) => {
  try {
    const { email, password } = req.body;
    const found = users.find(
      (value) => value.email === email && value.password === password
    );
    if (!found) {
      return res.status(401).json({ message: "User not found" });
    }
    return res.json({ ...found, token: "123" });
  } catch (err) {
    next(err);
  }
});


app.listen(8080, () => {
  console.log("Server Started on port 8080");
});
