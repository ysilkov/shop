import Auth from "./components/auth.js";
import Products from "./components/productsMongoDB.js";

class PostController {
  async create(req, res) {
    try {
      const { fullName, email, password } = req.body;
      const auth = await Auth.createUser(fullName, email, password);
      return res.json({
        fullName: auth.fullName,
        email: auth.email,
        token: auth.token,
      });
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const {
        token,
        email: userEmail,
        fullName,
      } = await Auth.loginUser(email, password);
      return res.json({ token, email: userEmail, fullName });
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }
  async sortProducts(req, res) {
    try {
      const {category} = req.body;
      const products = await Products.find({category: category}).limit(req.query.limit);
      return res.json(products);
    } catch (e) {
      return res.status(400).json({ message: `Продукти відсутні`  });
    }
  }
}

export default new PostController();
