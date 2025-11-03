import { Cart } from "../models/cart.model.js";
import { product } from "../models/product.model.js";

// Helper function to get a cart by userId or guestId
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged-in user
// @access Public
export const createCart = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  console.log(productId, quantity, size, color, guestId, userId);

  try {
    const Product = await product.findById(productId);
    if (!Product) return res.status(404).json({ message: "Product not found" });

    let cart = await getCart(userId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          name: Product.name,
          image: Product.images[0].url,
          price: Product.price,
          size,
          color,
          quantity,
        });
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: Product.name,
            image: Product.images[0].url,
            price: Product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: Product.price * quantity,
      });

      return res.status(201).json(newCart);
    }
  } catch (err) {
    console.error("Cart creation error:", err.message);
    res.status(500).send("Internal Server Error");
  }
};
