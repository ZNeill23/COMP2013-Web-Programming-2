import ProductCard from "./ProductCard";

export default function ProductsContainer({
  products,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  productsQuantity,
}) {
  return (
    <div className="ProductsContainer">
      {products.map((product) => {
        const pQuantity = productsQuantity.find((p) => p._id === product._id);
        const quantity = pQuantity ? pQuantity.quantity : 0;

        return (
          <ProductCard
            key={product._id}
            {...product}
            handleAddQuantity={handleAddQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            handleAddToCart={handleAddToCart}
            productsQuantity={quantity}
          />
        );
      })}
    </div>
  );
}
