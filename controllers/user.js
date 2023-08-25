const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userController = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return res.status(401).json("Please provide all the details!!");
  }
  const existingUser = await User.findOne({ email: email });
  let tokenPayload = {};
  let newUser;
  try {
    if (!existingUser) {
      const user = new User({ email, name });
      newUser = await user.save();
      tokenPayload = {
        id: newUser._id,
      };
    } else {
      tokenPayload = {
        id: existingUser._id,
      };
    }
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
      expiresIn: "2d",
    });
    await User.findByIdAndUpdate(tokenPayload.id, { token: token });
    const data = existingUser ? existingUser._doc : newUser._doc;
    res.status(201).json({ ...data, token });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

module.exports = userController;
