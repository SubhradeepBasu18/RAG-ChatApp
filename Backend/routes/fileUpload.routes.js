import { Router } from "express";
import { uploadFile } from "../controllers/fileUpload.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()

//Redo the code below
router.route("/upload").post(
    upload.fields([
        {
            name: 'source', maxCount: 1
        }
    ]), uploadFile
)

// router.route("/status").post(upload.none(),getUploadStatus)

export default router