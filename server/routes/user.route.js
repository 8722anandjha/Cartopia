import express from "express";
import user from "../models/user.schema.js";
import jwt from "jsonwebtoken";
import protect from "../middleware/auth.middleware.js";
const router = express.Router();

//@route POST /api/users/register
//register user
//@access Public
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Registration Logic
    let User = await user.findOne({ email });
    if (User) {
      return res.status(400).json({
        message: "user already exists",
      });
    }
    User = new user({ name, email, password });
    await User.save();

    const payload = { user: { _id: User._id, role: User.role } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) throw err;
        // send the user and token in response
        res.status(201).json({
          user: {
            _id: User._id,
            name: User.name,
            email: User.email,
            role: User.role,
          },
          token,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error", err);
  }
});

//@route POST /api/users/login
//desc Authenticate user
//@access Public

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    let existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }
    const isMatch = await existingUser.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });


    const payload = { user: { _id: existingUser._id, role: existingUser.role } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) throw err;
        // send the user and token in response
        res.json({
          existingUser: {
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
          },
          token,
        });
      }
    );
  } catch (err) {
    console.log(err)
    res.status(500).send('server Error while Login')
  }
});


// @route GET /api/users/profile
//@desc Get logged-in user's profile (protected Route)
//@access Private

router.get("/profile",protect , async (req,res)=>{
    res.json(req.user)
})

export default router;
