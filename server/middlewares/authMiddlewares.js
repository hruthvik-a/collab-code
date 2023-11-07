import jwt from "jsonwebtoken";

// Replace 'your-secret-key' with your actual secret key stored securely.
const secretKey = process.env.JWT_SECRET || "your-secret-key";
export function createToken(req, res, next) {
  try {
    console.log("createToken");
    const { username, password } = req.body; //store username and passowrd for later use
    if (!username || !password) {
      return res
        .code(401)
        .send({ message: "username and passowrd are required" });
    }

    const payload = {
      username,
    };
    const options = {
      expiresIn: "1h",
    };
    // Generate token
    const token = jwt.sign(payload, secretKey, options);
    res.status(200).send({
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).status({
      error: err,
    });
  }
}

export function authenticateToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).send({ message: "Token is missing" });
    }

    jwt.verify(token, secretKey, (err, user) => {
      req.user = user;
      if (err) {
        console.log(err);
        return res.status(403).send({
          message: "Invalid token",
        });
      } else {
        next();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error while authenticating the token" });
  }
}
