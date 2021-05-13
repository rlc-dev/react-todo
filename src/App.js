import React, { useState } from "react";
import TodoList from "./TodoList"

function App() {
  const [todos, setTodos] = useState([])

	return (
		<>
			<TodoList todos={todos} />
			<input type="text" />
      <button>Add new item</button>
      <button>Remove done items</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do.</div>
		</>
	);
}

export default App;
