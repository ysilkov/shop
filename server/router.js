import Router from "express"
import GetController from "./GetController.js";
import PostController from "./PostController.js";

const router = new Router();

router.post('/auth', PostController.create)
router.post('/login', PostController.login)
router.post('/sortProducts', PostController.sortProducts)
router.get('/products', GetController.products)
router.get('/allProducts', GetController.allProducts)

export default router