import mongoose from "mongoose";
import { product } from "../models/product.model.js";



//@desc Create a new Product
//@access Private/Admin

export const creatProducts = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const Product = new product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id, // Reference to the admin user who created it
    });
    const createdProduct = await Product.save();
    res.status(201).json({
      message: "Created Product",
    });
  } catch (err) {
    console.error("Error while creating product", err);
    res.status(500).send("Server Error");
  }
}

// @desc Update an existing product ID
// @access Private/Admin

export const updateProducts =  async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    // Find Product by ID
    const Product = await product.findById(req.params.id);
    if (Product) {
      // Update Product fields
      Product.name = name || Product.name;
      Product.description = description || Product.description;
      Product.price = price || Product.pirce;
      Product.countInStock = countInStock || Product.countInStock;
      Product.category = category || Product.category;
      Product.brand = brand || Product.brand;
      Product.sizes = sizes || Product.sizes;
      Product.colors = colors || Product.colors;
      Product.collections = collections || Product.collections;
      Product.material = material || Product.material;
      Product.gender = gender || Product.gender;
      Product.images = images || Product.images;
      Product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      Product.isPublished =
        isPublished !== undefined ? isFeatured : product.isPublished;
      Product.tags = tags || Product.tags;
      Product.dimensions = dimensions || Product.dimensions;
      Product.weight = weight || Product.weight;
      Product.sku = sku || Product.sku;

      // save the updated product
      const updatedProduct = await Product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error("Error while updating products: ", err);
    res.status(500).send("Internal Server Error");
  }
}

// @desc Delete a product by ID
// @access  Private/Admin

 export const deleteProduct = async (req, res) => {
  try {
    // Find Product by ID
    const Product = await product.findById(req.params.id);
    if (Product) {
      // Remove the product from DB
      await Product.deleteOne();
      res.json({ message: "Prodcut removed from database" });
    } else {
      res.status(404).json("Produc not found in DB");
    }
  } catch (err) {
    console.err("Error while deletion of product", err);
    res.status(500).send("Internal Server Error");
  }
}

// @desc Get all Products with optional query filters
// @access public
 export const filterProducts = async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    // Filter logic
    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection;
    }
    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (size) {
      query.sizes = { $in: size.split(",") };
    }
    if (color) {
      query.colors = { $in: [color] };
    }
    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    // Sort Logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "PriceAsc":
          sort = { price: 1 };
          break;
        case "PriceDesc":
          sort = { price: -1 };
          break;
        case "Popularity":
          sor = { rating: -1 };
          break;
        default:
          break;
      }
    }

    // Fetch products and apply sorting and limit

    let prodcuts = await product
      .find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(prodcuts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

// @desc Retrieve latest 8 products = Creation date
// @access public
export const newArrivals = async (req, res) => {
  try {
    // Fetch latest 8 products
    const newArrivals = await product.find().sort({ createdAt: -1 }).limit(8);
    res.status(202).json(newArrivals)
 
  } catch (err) {
    console.error(err)
    res.status(500).send("Internal server Error")
  }
}

// @desc Retrieve the product with highest rating
// @access Public
export const bestSeller =  async (req, res) => {
  try {
    const bestSeller = await product.findOne().sort({ rating: -1 });
    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: "No best seller found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

// @desc Get a single product by ID
// @access public
 export const findProductByID = async (req, res) => {
  try {
    const Prodcut = await product.findById(req.params.id);

    if (Prodcut) {
      res.status(200).json(Prodcut);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server Error");
  }
}

// @desc Retrieve similar products based on the current product's gender and category
// @access public
export const similarProducts =  async (req, res) => {
  const { id } = req.params;
  try {
    // prevent CastError for invalid ObjectId
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({message:"Invalid product ID"})
    }
    const Product = await product.findById(id);
    if (!Product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const similarProducts = await product
      .find({
        _id: { $ne: id },
        gender: Product.gender,
        category: Product.category,
      })
      .limit(4);

    res.json(similarProducts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}
