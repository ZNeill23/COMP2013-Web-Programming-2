import { useState } from "react";

export default function CounterWithLimits() {
  const upperLimit = 10;
  const lowerLimit = -10;
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => count < upperLimit && setCount(count + 1)}>
        Add
      </button>
      <button onClick={() => count > lowerLimit && setCount(count - 1)}>
        Subtract
      </button>
    </div>
  );
}
