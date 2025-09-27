export default function Listing({ country, pic, location, rating, price }) {
  return (
    <div className="Listing">
      <h2>{country}</h2>
      <img src={pic} alt="" width="150px" />
      <h3>{location}</h3>
      <p>Rating: {rating} ★</p>
      <p>Price: {price}</p>
    </div>
  );
}
