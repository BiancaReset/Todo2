import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [inputText, setInputText] = useState("");
  const [todosList, setTodosList] = useState([]);

  useEffect(() => {
    bringTodos()
    createTodo()
  }, []);


  const createTodo = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/BiancaReset", {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json)
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }
  const addTodo = () => {
    let task = { label: inputText, done: false }
    let pendingTodos = [...todosList, task]
    setTodosList(pendingTodos)
    fetch('https://playground.4geeks.com/apis/fake/todos/user/BiancaReset', {
      method: "PUT",
      body: JSON.stringify(todosList),
      headers: {
        "Content-Type": "application/json"
      }
      
    })
    .then((resp) => {
      if (resp.ok) {
          bringTodos(); 
          return resp.json();
      } else {
          throw new Error("There has been an error");
      }
  })
  .then((data) => {
      setTodosList(data);
  })
  .catch((error) => {
      console.log(error);
  });
  }

  const bringTodos = () => {
    fetch(
      "https://playground.4geeks.com/apis/fake/todos/user/BiancaReset",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(resp => resp.json())
      .then(data => setTodosList(data))
      .catch(error => console.log(error))
  }

  const deleteTodo = () => {

    fetch(
      "https://playground.4geeks.com/apis/fake/todos/user/BiancaReset/",
      {
        method: "DELETE",
      }
    ).then(() => {
      bringTodos();
    });
  };

  const deleteAllTodos = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/BiancaReset", {
      method: "DELETE",

    }).then(() => {
      setTodosList([]);
    });
  };


  return (
    <div className="text-center mt-5 container">
      <h1>Todo list</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTodo();
        }}
      >
        <input
          className="form-control form-control-lg my-3 elinput"
          placeholder="Add todo"
          onChange={(event) => setInputText(event.target.value)}
          value={inputText}
        />
        <button type="submit" className="btn btn-primary">
          Add Todo
        </button>
      </form>
      <ul className="list-group row">
        {todosList.length > 0 && todosList.map((item) => (
          <li className="list-group-item text-left elementos" key={item._id}>
            <span>{item.label}</span>
            <button
              className="btn btn-danger eliminador float-right"
              onClick={() => deleteTodo(item._id)}
            >
              <span>X</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="pendientes">{todosList.length} pending</div>
      <button className="btn btn-danger" onClick={deleteAllTodos}>
        Delete Todo List
      </button>
    </div>
  );
};

export default TodoApp;