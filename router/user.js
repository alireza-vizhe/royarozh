const express = require("express");

const userController = require("../controller/user");

const route = express.Router();

route.get("/posts", userController.getPosts);
route.get("/users", userController.getUser);
route.post("/register", userController.newUser);
route.post("/login", userController.login);
route.post("/buy-product", userController.buyProducts);
route.post("/delete-post", userController.deleteProducs);
route.post("/update-post", userController.updatePost);
route.post("/single-post", userController.getSinglePost);
route.get("/orders", userController.getOrders);
route.post("/set-order", userController.setOrders);
route.post("/delete-order", userController.deleteOrder);
route.post("/delete-order-admin", userController.deleteOrderInDasgboard);

module.exports = route;