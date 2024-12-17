import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [todos, setTodos] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [task, setTask] = useState({});
  const [count, setCount] = useState(2);

  useEffect(() => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/vdubach")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos(data);
      })
      .then((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/vdubach", {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .then((error) => {
        console.log(error);
      });
  }, [todos]);

  const addTodos = (e) => {
    if (e.key === "Enter") {
      // Create a new task using the latest userInput
      const newTask = { label: userInput, id: count, done: false };
      
      // Update the task state
      setTask(newTask);
      
      // Add the new task to the todos array
      setTodos([...todos, newTask]);
      
      // Clear the input field
      setUserInput("");
      
      // Increment the count
      setCount(count + 1);
    }
  };
  

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };
  //   so i stands for the index of the li that should be deleted
  // index stands for each index of the todos array
  // i is being recievd by this function
  const removeTodos = (i) => {
    const newArray = todos.filter((todo, index) => index !== i);
    setTodos(newArray);
  };

  return (
    <div className="text-center todoList">
      <input
        onChange={handleUserInput}
        value={userInput + " "}
        onKeyDown={(e) => addTodos(e)}
        className="my-2"
      />
      <ul className="w-25 mx-auto">
        {/* todos.length ? todos.map() : null */}
        {todos?.map((todo, index) => (
          <li className="mx-3" key={index}>
            {todo.label}
            <span>
              <i
                className="fa-solid fa fa-trash fa-bounce mx-4"
                onClick={() => removeTodos(index)}
              ></i>
            </span>
            {console.log(todo)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;