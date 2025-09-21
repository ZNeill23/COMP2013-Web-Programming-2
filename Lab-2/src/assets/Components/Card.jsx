export default function Card(props) {
  return (
    <div className="Card-Component">
      <img src={props.image} alt="" />
      <h3>{props.name}</h3>
      <h4>{props.location}</h4>
      <h4 style={{ color: props.rating >= 4.0 ? "green" : "red" }}>
        {props.rating} ★
      </h4>

      <p>{props.price}</p>
    </div>
  );
}
