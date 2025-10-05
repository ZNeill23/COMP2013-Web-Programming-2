import { useState } from "react";

export default function ColorBox({ colors }) {
  const [boxColors, setBoxColors] = useState(
    Array(25)
      .fill()
      .map(() => colors[Math.floor(Math.random() * colors.length)])
  );

  // Used mdn web doc to help with Array function https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

  function changeColor(index) {
    const newColors = [...boxColors];
    newColors[index] = colors[Math.floor(Math.random() * colors.length)];
    setBoxColors(newColors);
  }

  return (
    <div className="ColorBoxesContainer">
      {boxColors.map((color, index) => (
        <div
          className="ColorBox"
          key={index}
          style={{ backgroundColor: color }}
          onClick={() => changeColor(index)}
        ></div>
      ))}
    </div>
  );
}
