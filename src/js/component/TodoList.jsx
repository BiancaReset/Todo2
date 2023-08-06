import React, { useState, useEffect } from 'react';

const API_URL = 'https://playground.4geeks.com/apis/fake/todos/user/BiancaReset';

export default function TodoList() {
  async function fetchApi() {
    let headers = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
    let response = await fetch(API_URL, headers);
    let data = await response.json();
    console.log(data);
  }

  async function createUser() {
    let headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([]),
    }
    let create = await fetch(API_URL, headers);
    let newUser = await create.json();
    console.log(newUser);
  }

  async function updateTodo() {
    let headers = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([
        { label: "Make the bed", done: false },
        { label: "Walk the dog", done: false },
        { label: "Do the replits", done: false }
      ]),
    };
    let update = await fetch(API_URL, headers);
    let data = await update.json();
    console.log(data)
    console.log("hola");
  }

  async function deleteTodo() {
    let headers = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    };
    let deleteTask = await fetch(API_URL, headers);
    let newTodo = await deleteTask.json();

    console.log(newTodo);
  }
  deleteTodo();


  return (
    <>
    </>
  )
}


