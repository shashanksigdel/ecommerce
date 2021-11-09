const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../../middlewares/auth")

router.get("/products", productController.getProducts)
router.get("/product/:id", productController.getSingleProduct)
router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.newProduct
)
router.put(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.updateProduct
)
router.delete(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.deleteProduct
)

module.exports = router
