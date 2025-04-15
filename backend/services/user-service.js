import { getInvalidUserRequestMessage } from "../utils/user-helper.js";
import { userModel } from "../data/models/user.model.js";

const jwt = await import("jsonwebtoken");
const bcrypt = await import("bcryptjs");
const SECRET_KEY = "supersecretkey";

export async function loginUser(req, res) {
  const { username, password } = req.body;
  const invalidRequestMessage = getInvalidUserRequestMessage(req, false);
  if (invalidRequestMessage) {
    return res.status(400).json({ message: invalidRequestMessage });
  }
  const user = await userModel.findOne({ username: username });
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

export async function registerUser(req, res) {
  const { username, password, fingerprint } = req.body;
  const invalidRequestMessage = getInvalidUserRequestMessage(req, true);
  if (invalidRequestMessage) {
    return res.status(400).json({ message: invalidRequestMessage });
  }
  // Load existing users
  const users = await userModel.find();
  // Check if the username already exists
  let existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: "Username already exists." });
  }
  existingUser = users.filter((user) => user.fingerprint === fingerprint);
  if (existingUser.length >= 5) {
    return res.status(409).json({
      message:
        "You have reached the limit of registering accounts from one device, account limit = 3",
    });
  }

  const hash = bcrypt.default.hashSync(password);
  const newUser = { id: Date.now(), username, hash, fingerprint };
  userModel
    .create(newUser)
    .then(() => {
      res
        .status(201)
        .json({ message: `User "${username}" registered successfully!` });
    })
    .catch((err) => {
      res.json(503).json({ message: `Error registering user ${err}` });
    });
}
