import Products from "./components/productsMongoDB.js";

class GetController{
async products(req, res) {
   try {
     const products = await Products.find().sort({id: 1}).limit(req.query.limit);
     return res.json(products);
   } catch (e) {
     return res.status(400).json({ message: `Продукти відсутні`  });
   }
 }
 async allProducts(req, res) {
  try {
    const products = await Products.find();
    return res.json(products);
  } catch (e) {
    return res.status(400).json({ message: `Продукти відсутні`  });
  }
}
}
export default new GetController();
