const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const todosData = [
//   {
//     id: 1,
//     title: "Complete Express backend setup",
//     completed: true,
//     priority: "high",
//     dueDate: "2026-09-15",
//   },
//   {
//     id: 2,
//     title: "Design REST API endpoints",
//     completed: true,
//     priority: "medium",
//     dueDate: "2026-09-16",
//   },
//   {
//     id: 3,
//     title: "Integrate JSON body parser middleware",
//     completed: false,
//     priority: "high",
//     dueDate: "2026-09-18",
//   },
//   {
//     id: 4,
//     title: "Connect frontend fetch requests",
//     completed: false,
//     priority: "medium",
//     dueDate: "2026-09-20",
//   },
//   {
//     id: 5,
//     title: "Write unit tests for controller functions",
//     completed: false,
//     priority: "low",
//     dueDate: "2026-09-22",
//   },
// ];

let todosData = [];
const path = __dirname + "/todos.json";
app.get("/todos", (req, res) => {
  try {
    fs.readFile(path, { encoding: "utf-8" }, (error, data) => {
      if (error) throw err;
      const todos = data ? JSON.parse(data) : [];
      return res.status(200).send(todos);
    });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
});

app.post("/todos", (req, res) => {
  try {
    const newTodo = JSON.stringify(req.body);
    fs.readFile(path, { encoding: "utf-8" }, (error, data) => {
      const dataFromFile = data ? JSON.parse(data) : [];
      todosData = [...dataFromFile, JSON.parse(newTodo)];

      fs.writeFile(path, JSON.stringify(todosData), (error) => {
        res.status(201).send({ message: "Todo added sucessfully..." });
      });
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

app.put("/todos/:id", (req, res) => {
  try {
    const todoId = parseInt(req.params.id);
    fs.readFile(path, (error, data) => {
      todosData = JSON.parse(data);
      const index = todosData.findIndex((todo) => todo.id === todoId);
      todosData[index] = { ...todosData[index], ...req.body };
      fs.writeFile(path, JSON.stringify(todosData), (error) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "todo not updated, please try again" });
        }
        res.status(200).send({ message: "Todo updated sucessfully..." });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to update todo" });
  }
});

app.delete("/todos/:id", (req, res) => {
  try {
    const todoId = parseInt(req.params.id);

    fs.readFile(path, (error, data) => {
      todosData = JSON.parse(data);
      const filteredData = JSON.stringify(
        todosData.filter((todo) => todoId !== todo.id),
      );
      fs.writeFile(path, filteredData, (error) => {
        if (error) throw error;

        res.status(200).send({ message: "Todo deleted sucessfully..." });
      });
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.listen(5000, () => {
  console.log("Server is running");
});
