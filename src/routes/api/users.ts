import express from "express";

import getUser from "../../user/getUser";
import updateUser from "../../user/updateUser";

import hendleJwtControler from "../../midlewares/hendleJwtControler";
import upload from "../../midlewares/cloudinary/upload";

const router = express.Router();

router.get("/current", hendleJwtControler, getUser);

router.patch(
  "/edit",
  hendleJwtControler,
  upload.single("avatar"),
  updateUser
);

export default router;
