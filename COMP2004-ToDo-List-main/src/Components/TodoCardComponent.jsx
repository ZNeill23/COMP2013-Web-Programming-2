export default function TodoCardComponent({
  todoList,
  handleDeleteTodo,
  handleCheck,
}) {
  return (
    <div>
      <ul>
        {todoList.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={(e) => {
                handleCheck(e, index);
              }}
            />
            <span
              style={
                todo.checked
                  ? { textDecoration: "line-through" }
                  : { textDecoration: "none" }
              }
            >
              {todo.title}
            </span>
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
