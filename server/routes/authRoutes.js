const { User } = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = "0000";

function generateAccessToken({ username, _id }) {
  return jwt.sign({ username, _id }, secretKey, { expiresIn: "15s" });
}

function validateToken(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const [_, token] = req.headers.authorization.split(" ");
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json("Unauthorized User");
      }

      req.user = user;
      return next();
    });
  }
  return res.status(400).json("Unvalid token");
}

function UserRoutes(app) {
  app.get("/auth", (_, res) => res.status(200).send("Hello from auth server"));
  app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(301).json("user already exists");
    }

    try {
      const newUser = new User({ username, password });
      newUser.password = bcrypt.hashSync(password, 12);
      const user = await newUser.save();
      delete user.password;
      const token = generateAccessToken(user);

      return res.status(200).json(token);
    } catch (error) {
      res.json(error.message);
    }
  });

  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json("User not found");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json("Uncorrect password");
    }

    delete user.password;

    const token = generateAccessToken(user);
    return res.status(201).json({ token, user });
  });

  app.get("/account", validateToken, (req, res) => {
    return res.status(201).json({ user: req.user });
  });
}

module.exports = { UserRoutes };
