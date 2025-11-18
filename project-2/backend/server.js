// Initializing server
const express = require("express");
const server = express();
const port = 3000;
const mongoose = require("mongoose");
require("dotenv").config();
const { DB_URI } = process.env;
const cors = require("cors");
const Product = require("./models/product");

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

// Database connection and server listening
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(
        `Database is connected\nServer is running on http://localhost:${port}`
      );
    });
  })
  .catch((error) => console.log(error.message));

// Routes
server.get("/", (require, response) => {
  response.send("Server is running!");
});

// To GET all the data from products collection
server.get("/products", async (require, response) => {
  try {
    const products = await Product.find();
    response.send(products);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// To POST a new product to DB
server.post("/products", async (require, response) => {
  const { id, productName, brand, image, price } = require.body;
  const newProduct = new Product({
    id,
    productName,
    brand,
    image,
    price,
  });
  try {
    await newProduct.save();
    response.status(200).send({
      message: "Product added successfully",
      date: new Date(Date.now()),
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// To DELETE a product from DB by it's id
server.delete("/products/:id", async (require, response) => {
  const { id } = require.params;
  try {
    await Product.findByIdAndDelete(id);
    response.send({
      message: "Product deleted successfully",
      date: new Date(Date.now()),
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// To GET one product by id
server.get("/products/:id", async (require, response) => {
  const { id } = require.params;
  try {
    const productToEdit = await Product.findById(id);
    response.send(productToEdit);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// To PATCH a contact by id
server.patch("/products/:id", async (require, response) => {
  const { id } = require.params;
  const { productName, brand, image, price } = require.body;
  try {
    await Product.findByIdAndUpdate(id, {
      productName,
      brand,
      image,
      price,
    });
    response.send({
      message: "Product updated successfully",
      date: new Date(Date.now()),
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});
