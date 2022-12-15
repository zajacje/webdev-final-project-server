import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import UsersController from "./users/users-controller.js";
import LikesController from "./likes/likes-controller.js";
import PlansController from "./plans/plans-controller.js";
import MembershipsController from "./memberships/memberships-controller.js";
import PostsController from "./posts/posts-controller.js";

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/wecook";
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.WECOOK_FRONTEND_URL || "http://localhost:3000",
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // needs HTTPS
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the meal plan server!");
});
UsersController(app);
LikesController(app);
PlansController(app);
MembershipsController(app);
PostsController(app);
app.listen(4000);
