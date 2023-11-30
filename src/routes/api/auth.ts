import express from "express";

import setUser from "../../user/setUser";
import loginUser from "../../user/loginUser";
import logoutUser from "../../user/logoutUser";

import hendleJwtControler from "../../midlewares/hendleJwtControler";

const router = express.Router();

router.use(
  require("express-session")({
    secret: process.env.CLIENT_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

router.post("/register", setUser);

router.post("/login", loginUser);

router.post("/logout", hendleJwtControler, logoutUser);

export default router;
