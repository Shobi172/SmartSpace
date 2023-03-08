const express = require("express");
const adminController = require("../controllers/adminController");

const admin_route = express.Router();

admin_route.get("/users", adminController.getUsers);
admin_route.put("/users/:id", adminController.editUsers);

module.exports = admin_route;
