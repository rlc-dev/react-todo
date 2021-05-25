import React, { useState, useRef, useEffect } from "react"
import TodoList from "./TodoList"
import uuidv4 from "uuid/dist/v4"
import Button from "react-bootstrap/Button"
import "./styles.css"

const LOCAL_STORAGE_KEY = "todoApp.todos"

function App() {
	const [todos, setTodos] = useState([])
	const todoNameRef = useRef()

	// For persistance of data
	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
		if (storedTodos) setTodos(storedTodos)
	}, [])

	// Set state of todo
	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
	}, [todos])

	// Toggles todo status based on id and initial state, if toggled id matches, it toggles state to the opposite of current
	function toggleTodo(id) {
		const newTodos = [...todos]
		const todo = newTodos.find(todo => todo.id === id)
		todo.complete = !todo.complete
		setTodos(newTodos)
	}

	// Fetches existing todos and adds new todo
	function handleAddTodo(e) {
		const name = todoNameRef.current.value
		if (name === "") return
		setTodos(prevTodos => {
			return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
		})
		todoNameRef.current.value = null
	}
	// Clears all todos toggled complete
	function handleClearTodos() {
		const newTodos = todos.filter(todo => !todo.complete)
		setTodos(newTodos)
	}

	return (
		<>
			<TodoList todos={todos} toggleTodo={toggleTodo} />
			<input id="todo-input" ref={todoNameRef} type="text" />
			<br />
			<Button variant="primary" size="lg" onClick={handleAddTodo}>
				Add Todo
			</Button>{" "}
			<Button variant="secondary" size="lg" onClick={handleClearTodos}>
				Clear Complete
			</Button>
			<br />
			<br />
			<div>{todos.filter(todo => !todo.complete).length} left to do.</div>
		</>
	)
}

export default App
