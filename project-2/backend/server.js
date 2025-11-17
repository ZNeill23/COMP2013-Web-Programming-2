const express = require("express");
const server = express();
const port = 3000;
const mongoose = require("mongoose");
require("dotenv").config();
const { DB_URI } = process.env;
const cors = require("cors");
const Product = require("./models/product");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

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

server.get("/", (require, response) => {
  response.send("Server is running!");
});

server.get("/products", async (require, response) => {
  try {
    const products = await Product.find();
    response.send(products);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});
