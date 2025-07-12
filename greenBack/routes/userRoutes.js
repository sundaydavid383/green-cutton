const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // Adjust path as needed

// ======= User Authentication =======
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/verify-otp", userController.verifyOtp);

// ======= User Profile Management =======
router.get("/users", userController.getAllUsers);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.delete("/users", userController.deleteAllUsers);

// ======= User Body Measurement =======
router.post("/users-measurement/:id", userController.editBodyMeasurements);

module.exports = router;