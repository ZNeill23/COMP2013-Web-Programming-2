import { useState } from "react";

export default function Counter() {
  // We define the variable and setter function then we assign useState to them and we add the initial value for the variable as an argument for the useState function
  let initialState = 2000;
  const [count, setCounter] = useState(initialState);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCounter(count + 1)}>Add to counter</button>
      <button onClick={() => setCounter(count - 1)}>
        Subtract from counter
      </button>
      <button onClick={() => setCounter(0)}>Reset counter</button>
    </div>
  );
}
