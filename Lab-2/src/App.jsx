import "./App.css";
import Card from "./assets/Components/Card";

function App() {
  return (
    <>
      <h1 className="title">Resorts Lite</h1>
      <hr />
      <div className="main-container">
        <Card
          image="src/assets/images/1.jpg"
          name="Indonesia"
          location="Gali Air Hotel"
          rating="4.8 "
          price="$589/night"
        />
        <Card
          image="src/assets/images/2.jpg"
          name="Seychelles"
          location="Hilton Resort"
          rating="4.2"
          price="$629/night"
        />
        <Card
          image="src/assets/images/3.jpg"
          name="US Virgin Islands"
          location="Goa Resort"
          rating="3.5"
          price="$485/night"
        />
        <Card
          image="src/assets/images/4.jpg"
          name="Bahamas"
          location="Kuredu Resort"
          rating="4.1"
          price="$729/night"
        />
        <Card
          image="src/assets/images/5.jpg"
          name="Mauritius"
          location="Trou D'eau Douce"
          rating="4.9"
          price="$877/night"
        />
        <Card
          image="src/assets/images/6.jpg"
          name="Bermuda"
          location="Staniel Cay Hotel"
          rating="3.2"
          price="$365/night"
        />
      </div>
    </>
  );
}

export default App;
