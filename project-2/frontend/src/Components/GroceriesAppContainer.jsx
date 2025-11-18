import { useState, useEffect } from "react";
import CartContainer from "./CartContainer";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";
import axios from "axios";
import ProductForm from "./ProductForm";

export default function GroceriesAppContainer() {
  const [productsData, setProductsData] = useState([]);
  const [productsQuantity, setProductsQuantity] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });
  const [postResponse, setPostResponse] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    handleProductsDB();
  }, [postResponse]);

  const handleProductsDB = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      const productsFromDB = response.data;

      setProductsData(productsFromDB);

      setProductsQuantity(
        productsFromDB.map((product) => ({
          id: product._id,
          quantity: 0,
        }))
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddQuantity = (id, mode) => {
    if (mode === "cart") {
      const updated = cartList.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartList(updated);
      return;
    }

    if (mode === "product") {
      const updated = productsQuantity.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setProductsQuantity(updated);
      return;
    }
  };

  const handleRemoveQuantity = (id, mode) => {
    if (mode === "cart") {
      const updated = cartList.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCartList(updated);
      return;
    }

    if (mode === "product") {
      const updated = productsQuantity.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setProductsQuantity(updated);
      return;
    }
  };

  const handleAddToCart = (id) => {
    const product = productsData.find((p) => p._id === id);
    const pQuantity = productsQuantity.find((q) => q.id === id);

    const newCartList = [...cartList];
    const productInCart = newCartList.find((p) => p._id === id);

    if (productInCart) {
      productInCart.quantity += pQuantity.quantity;
    } else if (pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName}`);
    } else {
      newCartList.push({ ...product, quantity: pQuantity.quantity });
    }

    setCartList(newCartList);
  };

  const handleRemoveFromCart = (id) => {
    const updated = cartList.filter((p) => p._id !== id);
    setCartList(updated);
  };

  const handleClearCart = () => {
    setCartList([]);
  };

  const handleResetForm = () => {
    setFormData({
      productName: "",
      brand: "",
      image: "",
      price: "",
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        handleOnUpdate(formData._id);
        handleResetForm();
        setIsEditing(false);
      } else {
        await axios
          .post("http://localhost:3000/products", formData)
          .then((response) => {
            setPostResponse(response.data);
            console.log(response);
          })
          .then(() => {
            handleResetForm();
            handleProductsDB();
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/products/${id}`
      );
      setPostResponse(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOnEdit = async (id) => {
    try {
      const productToEdit = await axios.get(
        `http://localhost:3000/products/${id}`
      );
      setFormData({
        productName: productToEdit.data.productName,
        brand: productToEdit.data.brand,
        image: productToEdit.data.image,
        price: productToEdit.data.price,
        _id: productToEdit.data._id,
      });
      setIsEditing(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnUpdate = async (id) => {
    try {
      const result = await axios.patch(
        `http://localhost:3000/products/${id}`,
        formData
      );
      setPostResponse({ message: result.data.message, date: result.data.date });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar quantity={cartList.length} />

      <div className="GroceriesApp-Container">
        <div className="FormSection">
          <ProductForm
            productName={formData.productName}
            brand={formData.brand}
            image={formData.image}
            price={formData.price}
            handleOnSubmit={handleOnSubmit}
            handleOnChange={handleOnChange}
            isEditing={isEditing}
          />

          <p style={{ color: "green" }}>{postResponse?.message}</p>
        </div>

        <ProductsContainer
          products={productsData}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          productsQuantity={productsQuantity}
          handleOnEdit={handleOnEdit}
          handleOnDelete={handleOnDelete}
        />

        <CartContainer
          cartList={cartList}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
      </div>
    </div>
  );
}
