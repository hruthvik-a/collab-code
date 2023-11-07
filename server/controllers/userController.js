import { decrypt, encrypt, verify } from "../middlewares/crypt.js";
import { User } from "../models/userModel.js";

export async function createUser(req, res) {
  try {
    console.log("Creating user");
    const { username, password } = req.body;
    console.log(username);
    //check if user already exists
    let usernameExists = await User.findOne({ username });
    console.log("usernameExists");
    if (usernameExists) {
      return res.status(401).send({
        username: "exists",
      });
    }
    let cryptpassword = encrypt(password);
    console.log("cryptpassword", cryptpassword);
    const user = new User({
      username: username,
      password: cryptpassword,
    });
    await user.save().then(() => {
      res.status(200).send({
        user,
      });
    });
  } catch (e) {
    console.log(err);
    return res.status(500).send({
      Message: err,
    });
  }
}

export async function userLogin(req, res, next) {
  try {
    console.log(req.body);
    if (
      req.body["username"] === undefined ||
      req.body["password"] === undefined
    )
      res.status(401).send({ message: "password and email is required" });
    let { username, password } = req.body;
    let user = await User.findOne({
      username: username,
    });
    if (!user)
      res
        .status(401)
        .send({ message: "please sign up and then try logging in " });
    if (verify(user.password, password)) {
      console.log("logged in successfully, next to create jwt token");
      next();
    } else {
      return res.status(403).send({ message: "password is incorrect" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err });
  }
}
