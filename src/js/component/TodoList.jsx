import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [inputText, setInputText] = useState("");
  const [todosList, setTodosList] = useState([]);

  useEffect(() => {
    bringTodos()
  }, []);


  const createTodo = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/BiancaReset", {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json)
      .then(() => bringTodos())
      .catch(error => console.log(error));
  }
  const addTodo = () => {
    let task = { label: inputText, done: false };
    let pendingTodos = [...todosList, task];

    fetch('https://playground.4geeks.com/apis/fake/todos/user/BiancaReset', {
      method: "PUT",
      body: JSON.stringify(pendingTodos),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("There has been an error");
        }
      })
      .then((data) => {
        bringTodos()
        setInputText("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const bringTodos = () => {
    fetch(
      "https://playground.4geeks.com/apis/fake/todos/user/BiancaReset",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(resp => resp.json())
      .then(data => {
        console.log(data)
        if (data.msg) {
          createTodo()
        }
        else {
          setTodosList(data)
        }
      })
      .catch(error => console.log(error))
  }

  const deleteTodo = (position) => {
    let pendingTodos = [...todosList];
    pendingTodos = pendingTodos.filter((item, index) => index !== position)


    fetch('https://playground.4geeks.com/apis/fake/todos/user/BiancaReset', {
      method: "PUT",
      body: JSON.stringify(pendingTodos),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("There has been an error");
        }
      })
      .then((data) => {
        bringTodos()
        //setTodosList(data); // Update todosList after the PUT request is successful
        setInputText(""); // Clear the input field
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAllTodos = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/BiancaReset", {
      method: "DELETE",

    }).then(() => {
      createTodo();
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
        {todosList.length > 0 && todosList.map((item, index) => (
          <li className="list-group-item text-left d-flex justify-content-between" key={index}>
            <span>{item.label}</span>
            <button
              className="btn btn-danger eliminador float-right"
              onClick={() => deleteTodo(index)}
            >
              <span>x</span>
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