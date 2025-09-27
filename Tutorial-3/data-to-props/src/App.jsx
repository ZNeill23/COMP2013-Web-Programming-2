import "./App.css";
import Clicker from "./Components/Clicker";
import EmptyForm from "./Components/EmptyForm";
import ListingsContainer from "./Components/ListingsContainer";
import ClickerWithProps from "./Components/ClickerWithProps";
import data from "./data/data";

function App() {
  return (
    <>
      <h2>Resorts Lite</h2>
      <ListingsContainer items={data} />
      <br />
      <Clicker />
      <EmptyForm />
      <ClickerWithProps
        message={"This is a clicker message as a prop"}
        btnText={"Click me I'm Irish"}
      />
      <ClickerWithProps
        message={"This is a clicker message as a prop"}
        btnText={"Click me I'm Welsh"}
      />
    </>
  );
}

export default App;
