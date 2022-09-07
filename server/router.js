import Router from "express"
import PostControler from "./PostControler.js";

const router = new Router();

router.post('/auth', PostControler.create)

export default router