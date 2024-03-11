import React, { useReducer, useState } from "react";

const initialState = {
  todos: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "add_todo":
      return {
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };
    case "toggle_todo":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "clear_completed":
      return {
        todos: state.todos.filter((todo) => !todo.completed),
      };
    default:
      return state;
  }
}

/*

Создайте компонент TodoList для управления списком дел, применяя хук useReducer для обработки добавления новых задач, переключения статуса выполнения и очистки выполненных задач.

Основные шаги:

1) Инициализируйте начальное состояние `initialState` со списком задач `todos`.
2) Реализуйте функцию `reducer` для обработки действий 'add_todo', 'toggle_todo' и 'clear_completed' с соответствующими изменениями состояния.
3) Используйте `useReducer` для управления состоянием списка задач в компоненте TodoList.
4) Разработайте логику для добавления новой задачи в список. При добавлении задачи обнуляйте поле ввода.
5) Отобразите список задач, где каждая задача может быть отмечена как выполненная по клику на неё, что должно переключать её статус 'completed'.
6) Реализуйте кнопку 'Clear Completed', которая удаляет все выполненные задачи из списка.

Цель задания: Научиться использовать хук useReducer для управления сложными состояниями в React-приложениях, а также практиковать обработку пользовательских взаимодействий и динамическое изменение списка данных.

*/

function TodoList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [newTodo, setNewTodo] = useState("");

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;
    dispatch({ type: "add_todo", payload: newTodo });
    setNewTodo("");
  };

  return (
    <div>
      <h1>TO DO List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newTodo} onChange={handleChange} />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {state.todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => dispatch({ type: "toggle_todo", payload: todo.id })}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch({ type: "clear_completed" })}>
        Clear Completed
      </button>
    </div>
  );
}

export default TodoList;
