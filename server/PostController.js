import Auth from "./components/auth.js";
import Order from "./components/order.js";

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
  async order(req, res) {
    try {
      const { email, fullName, phone, delivery, address, order } = req.body;
      const orderProducts = await Order.createOrder(
        email,
        fullName,
        phone,
        delivery,
        address,
        order
      );
      return res.json({
        message: `You have placed an order for items. You order number ${orderProducts._id}.`,
        orderProducts,
      });
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }
  async sortProductsCategory(req, res) {
    try {
      const { category } = req.body;
      const products = await Products.find({ category: category }).limit(
        req.query.limit
      );
      return res.json(products);
    } catch (e) {
      return res.status(400).json({ message: `Продукти відсутні` });
    }
  }
  async sortProductsBrand(req, res) {
    try {
      const { brand } = req.body;
      const products = await Products.find({ brand: brand }).limit(
        req.query.limit
      );
      return res.json(products);
    } catch (e) {
      return res.status(400).json({ message: `Продукти відсутні` });
    }
  }
  async sortBrandCategoryProducts(req, res) {
    try {
      const { brand, category } = req.body;
      const products = await Products.find({ brand: brand })
        .sort({ category: 1 })
        .find({ category: category })
        .limit(req.query.limit);
      return res.json(products);
    } catch (e) {
      return res.status(400).json({ message: `Продукти відсутні` });
    }
  }
}

export default new PostController();
