const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

const router = express.Router();

router.post('/register', authController.registerUser)

router.post('/login', authController.loginUser)

router.get('/profile', authMiddleware, authController.getProfile);

router.get('/admin', authMiddleware, adminMiddleware, authController.adminDashboard);

router.get('/logout', authController.logoutUser);

router.get('/users', authMiddleware, adminMiddleware,authController.getAllUsers);

router.delete('/users/:id', authMiddleware, adminMiddleware, authController.deleteUser);

router.get('/check-auth', authMiddleware,
  (req, res) => {
    res.status(200).json({
      authenticated: true
    })
  }
)


module.exports = router;