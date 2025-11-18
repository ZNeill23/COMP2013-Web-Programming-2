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
    quantity: "",
  });
  const [postResponse, setPostResponse] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    handleProductsDB();
  }, []);

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

  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      const updated = cartList.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartList(updated);
      return;
    }

    if (mode === "product") {
      const updated = productsQuantity.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setProductsQuantity(updated);
      return;
    }
  };

  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "cart") {
      const updated = cartList.map((item) =>
        item._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCartList(updated);
      return;
    }

    if (mode === "product") {
      const updated = productsQuantity.map((item) =>
        item.id === productId && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setProductsQuantity(updated);
      return;
    }
  };

  const handleAddToCart = (productId) => {
    const product = productsData.find((p) => p._id === productId);
    const pQuantity = productsQuantity.find((q) => q.id === productId);

    const newCartList = [...cartList];
    const productInCart = newCartList.find((p) => p._id === productId);

    if (productInCart) {
      productInCart.quantity += pQuantity.quantity;
    } else if (pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName}`);
    } else {
      newCartList.push({ ...product, quantity: pQuantity.quantity });
    }

    setCartList(newCartList);
  };

  const handleRemoveFromCart = (productId) => {
    const updated = cartList.filter((p) => p._id !== productId);
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
      quantity: "",
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
          })
          .then(() => {
            handleResetForm();
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  return (
    <div>
      <NavBar quantity={cartList.length} />

      <div className="GroceriesApp-Container">
        <ProductForm
          productName={formData.productName}
          brand={formData.brand}
          image={formData.image}
          price={formData.price}
          quantity={formData.quantity}
          handleOnSubmit={handleOnSubmit}
          handleOnChange={handleOnChange}
          isEditing={isEditing}
        />

        <ProductsContainer
          products={productsData}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          productsQuantity={productsQuantity}
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
