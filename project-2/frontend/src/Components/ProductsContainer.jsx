import ProductCard from "./ProductCard";

export default function ProductsContainer({
  products,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  productsQuantity,
  handleOnEdit,
  handleOnDelete,
}) {
  return (
    <div className="ProductsContainer">
      {products.map((product) => {
        const pQuantity = productsQuantity.find((p) => p.id === product._id);
        const quantity = pQuantity ? pQuantity.quantity : 0;

        // Two returns was the only way I could get the quantity to show correctly
        // unsure how to fix this otherwise or if this is the proper way to do it
        return (
          <ProductCard
            key={product._id}
            id={product._id}
            productName={product.productName}
            brand={product.brand}
            image={product.image}
            price={product.price}
            productQuantity={quantity}
            handleAddQuantity={handleAddQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            handleAddToCart={handleAddToCart}
            handleOnDelete={handleOnDelete}
            handleOnEdit={handleOnEdit}
          />
        );
      })}
    </div>
  );
}
