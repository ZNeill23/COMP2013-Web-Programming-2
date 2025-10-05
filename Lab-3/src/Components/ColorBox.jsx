import { useState } from "react";

export default function ColorBox({ colors }) {
  // When the page loads or the page is refreshed, the boxes will be a random color
  const [boxColors, setBoxColors] = useState(
    Array(25)
      .fill()
      .map(() => colors[Math.floor(Math.random() * colors.length)])
  );

  // Used mdn web doc to help with Array function https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

  // This function changes the color of the boxes to a random color when each small box is clicked.
  function changeColor(index) {
    const newColors = [...boxColors];
    newColors[index] = colors[Math.floor(Math.random() * colors.length)];
    setBoxColors(newColors);
  }

  return (
    <div className="ColorBoxesContainer">
      {boxColors.map((color, index) => (
        <div
          key={index}
          className="ColorBox"
          style={{ backgroundColor: color }}
          onClick={() => changeColor(index)}
        ></div>
      ))}
    </div>
  );
}
