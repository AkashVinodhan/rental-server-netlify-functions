const {
  getCheckoutPage,
  getProducts,
} = require("../controllers/cartController");
const {
  loginUser,
  registerUser,
  logoutUser,
} = require("../controllers/userController");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Home");
});

router.post("/checkout", getCheckoutPage);
router.get("/products", getProducts);

router.post("/login", loginUser);
router.post("/signup", registerUser);
router.get("/logout", logoutUser);

module.exports = router;
