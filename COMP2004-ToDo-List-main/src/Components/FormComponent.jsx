export default function FormComponent({ todo, handleChange, handleAddTodo }) {
  return (
    <div>
      <input
        type="text"
        name="title"
        value={todo.title}
        onChange={handleChange}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
}
