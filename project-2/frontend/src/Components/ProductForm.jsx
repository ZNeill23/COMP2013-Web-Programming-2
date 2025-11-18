export default function ProductForm({
  productName,
  brand,
  image,
  price,
  handleOnSubmit,
  handleOnChange,
  isEditing,
}) {
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="productName"
          id="productName"
          value={productName}
          onChange={handleOnChange}
          placeholder="Product Name"
          required
        />
        <br />

        <input
          type="text"
          name="brand"
          id="brand"
          value={brand}
          onChange={handleOnChange}
          placeholder="Brand"
          required
        />
        <br />

        <input
          type="text"
          name="image"
          id="image"
          value={image}
          onChange={handleOnChange}
          placeholder="Image Link"
        />
        <br />

        <input
          type="number"
          name="price"
          id="price"
          value={price}
          onChange={handleOnChange}
          placeholder="Price"
          required
        />
        <br />

        <button type="submit">
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
