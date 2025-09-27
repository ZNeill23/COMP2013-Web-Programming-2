import Listing from "./Listing"; // importing single Listing component

export default function ListingsContainer({ items }) {
  return (
    <div className="ListingsContainer">
      {items.map((item) => (
        <Listing key={item.id} {...item} />
      ))}
    </div>
  );
}
