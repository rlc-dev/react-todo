import React, { useState } from "react";
import TodoList from "./TodoList"

function App() {
  const [todos, setTodos] = useState([])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }


	return (
		<>
			<TodoList todos={todos} toggleTodo={toggleTodo} />
			<input type="text" />
      <button>Add Todo</button>
      <button>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do.</div>
		</>
	);
}

export default App;
