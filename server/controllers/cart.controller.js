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

// @desc Update product quantity int the cart fro the guest or looged-in user
// @access Public

export const updateCart = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);

    if (!cart) return res.status(404).json({ message: "Cart not found" });
    
    const productIndex = cart.products.findIndex(
      (p) =>
      
        p.productId.toString() === productId.toString() &&
        p.size?.toString() === size?.toString()&&
        p.color?.toString() === color?.toString().toLowerCase()
        
    );

    if (productIndex > -1) {
      //Update quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); // Remove product if quantity is 0
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Remove a product from the cart
// @access Public

export const deleteCart = async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  //  const { guestId, userId } = req.query;
  try {
    
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "cart not found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      cart.save();
      return res
        .status(200)
        .json({ message: "product deleted from cart", cart });
    } else {
      return res.status(404).json({ message: "product not found in the cart" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @route Get/api/cart
// @desc Get logged-in user's or guest user's cart
// @access public

export const getUsersCart = async (req, res) => {
  const { userId, guestId } = req.query;
  
  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "cart not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @route POST /api/cart/merge
// @desc Merger guest cart into user cart on login
// @access Private

export const checkoutCart = async (req, res) => {
  const { guestId } = req.body;
  try {
    //Find the guest cart and user cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ meggage: "Guest cart is empty" });
      }
      if (userCart) {
        // Merge guest cart into user cart
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );

          if (productIndex > -1) {
            // If the item exists in the user cart, update the quantity
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            // oterwise, add the guest item to the cart
            userCart.products.push(guestItem);
          }
        });
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await userCart.save();
        // Remove the guest cart after merging
        try{
          await Cart.findOneAndDelete({guestId})
        }catch(error){
          console.error("Error deleteing guest catr",error)
        }
        res.status(200).json(userCart)
      } else{
        // If the user has no existing cart, assign the guest cart to the user
        guestCart.user = req.user._id
        guestCart.guestId = undefined
        await getCart.save()
        res.status(200).json(guestCart)
      }
    } else{
      if(userCart ){
        // Guest cart has already been merged, return user cart
        return res.status(200).json(userCart)
      }
      res.status(404).json({message: "Guest cart not found"})
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
