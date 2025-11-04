import { useState } from "react";
import FormComponent from "./FormComponent";
import TodoCardComponent from "./TodoCardComponent";

export default function TodoAppContainer() {
  const [todo, setTodo] = useState({
    title: "",
    checked: false,
  }); //state to store todo

  const [todoList, setTodoList] = useState([]); //state to store todo list

  //function to handle input change in form
  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  //function to handle checkbox change
  const handleCheck = (e, index) => {
    setTodoList(
      todoList.map((item, i) =>
        //if index is equal to i then change checked value to opposite of current value
        i === index ? { ...item, checked: e.target.checked } : item
      )
    );
  };

  //function to handle add todo
  const handleAddTodo = () => {
    setTodoList([...todoList, todo]);
    setTodo({
      title: "",
      checked: false,
    });
  };

  //function to handle delete todo
  const handleDeleteTodo = (index) => {
    setTodoList(todoList.filter((item, i) => i !== index));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <FormComponent
        handleAddTodo={handleAddTodo}
        handleChange={handleChange}
        todo={todo}
      />
      <TodoCardComponent
        handleDeleteTodo={handleDeleteTodo}
        handleCheck={handleCheck}
        todoList={todoList}
      />
    </div>
  );
}
