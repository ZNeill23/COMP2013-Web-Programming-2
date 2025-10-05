import "./App.css";
import ColorBox from "./Components/ColorBox";
import data from "./data/data";

function App() {
  return (
    <>
      <ColorBox colors={data} />
    </>
  );
}

export default App;
