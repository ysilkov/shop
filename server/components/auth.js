import AuthMongoDB from "../components/authMongoDB.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secretKey } from "../config.js";

const generateAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, secretKey, { expiresIn: "24h" });
};
class ErrorMessage{
   constructor(message){
      this.message = message;
      this.name = "Error"
   }
}
class Auth {
  static async createUser(fullName, email, password) {
    try {
      const candidate = await AuthMongoDB.findOne({ email });
      if (candidate) {
        throw new ErrorMessage(
          "Користувач вже зареєстрований з такою електроною поштою"
        );
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = await AuthMongoDB.create({
        fullName,
        email,
        password: hashPassword,
      });
      const token = generateAccessToken(user._id);
      return { token: token, email, fullName: user.fullName };
    } catch (e) {
      throw new ErrorMessage(e);
    }
  }

  static async loginUser(email, password) {
    try {
      const user = await AuthMongoDB.findOne({ email });
      if (!user) {
        throw new ErrorMessage (`Користувач ${email} не знайдено`);
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
       throw new ErrorMessage("Пароль не вірний");
      }
      const token = generateAccessToken(user._id);
      return { token: token, email, fullName: user.fullName };
    } catch (e) {
      if(!e){
         throw new ErrorMessage("Виникла помилка");
      }
      throw new ErrorMessage(e);
    }
  }
}

export default Auth;
