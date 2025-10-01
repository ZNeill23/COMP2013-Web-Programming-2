// Always remember to import useState if you know you will use states in your code.
import { useState } from "react";

export default function Toggle() {
  const [isHappy, setIsHappy] = useState(true);

  return (
    <div>
      <h1>{isHappy ? "😊" : "🙁"}</h1>
      <button onClick={() => setIsHappy(!isHappy)}>
        {isHappy ? "Sad face" : "Happy face"}
      </button>
    </div>
  );
}
