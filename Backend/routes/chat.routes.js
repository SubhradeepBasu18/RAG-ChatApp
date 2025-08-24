import { Router } from "express";
import { sendAndReceiveQuery } from "../controllers/chat.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()

router.route("/sendAndReceiveQuery").post(upload.none(),sendAndReceiveQuery)

export default router