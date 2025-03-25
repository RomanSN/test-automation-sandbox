import { readFileSync, existsSync, writeFileSync } from "fs";
import { resolve } from "path";
import { getInvalidUserRequestMessage } from "../utils/user-helper.js"

const jwt = await import("jsonwebtoken");
const bcrypt = await import("bcryptjs");
const SECRET_KEY = "supersecretkey";
const usersdbFile = resolve("./databases/users_db.json");
const loadUsersDb = () => JSON.parse(readFileSync(usersdbFile, "utf8"));

export async function loginUser(req, res) {
  const { username, password } = req.body;
  const invalidRequestMessage = getInvalidUserRequestMessage(req, false);
  if (invalidRequestMessage) {
    return res.status(400).json({ message: invalidRequestMessage });
  }
  const users = loadUsersDb();
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  bcrypt.default.compare(password, user.hash, (err, result) => {
    if (result) {
      const token = jwt.default.sign({ username: user.username }, SECRET_KEY, {
        expiresIn: "1h",
      });
      res.json({ token, username: user.username });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  });
}

export function registerUser(req, res) {
  const { username, password, fingerprint } = req.body;
  const invalidRequestMessage = getInvalidUserRequestMessage(req, true);
  if (invalidRequestMessage) {
    return res.status(400).json({ message: invalidRequestMessage });
  }

  // Load existing users
  let users = [];
  if (existsSync(usersdbFile)) {
    users = JSON.parse(readFileSync(usersdbFile, "utf8"));
  }

  // Check if the username already exists
  let existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: "Username already exists." });
  }
  existingUser = users.filter((user) => user.fingerprint === fingerprint);
  if (existingUser.length >= 3) {
    return res.status(409).json({
      message:
        "You have reached the limit of registering accounts from one device, account limit = 3",
    });
  }

  // Add the new user to the users array
  const hash = bcrypt.default.hashSync(password);
  const newUser = { id: Date.now(), username, hash, fingerprint };
  users.push(newUser);

  // Save updated users array to users.json
  writeFileSync(usersdbFile, JSON.stringify(users, null, 2));

  res
    .status(201)
    .json({ message: `User "${username}" registered successfully!` });
}
