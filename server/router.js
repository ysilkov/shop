import Router from "express"
import PostController from "./PostController.js";

const router = new Router();

router.post('/auth', PostController.create)

export default router