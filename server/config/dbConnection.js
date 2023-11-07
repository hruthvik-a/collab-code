import mongoose from "mongoose";

const password = "t79lJf8KcC47BdT1";
const dbUri = `mongodb+srv://hruthvikgowda06:${password}@cluster0.d4qhcrk.mongodb.net/codecollab`;

const db = mongoose.createConnection(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.on("connected", () => {
  console.log("Db connection established");
});

db.on("error", () => {
  console.log("Db connection error");
});

export default db;
