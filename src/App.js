import { useState, useEffect } from "react";
import "./App.css";
import AddEditTodo from "./components/AddEditTodo";
import TodoList from "./components/TodoList";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState({
    title: "",
    completed: false,
    parent: null,
  });

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  const fetchTasks = () => {
    fetch("http://127.0.0.1:8000/tasks/")
      .then((response) => response.json())
      .then((data) => {
        const namesparent = replaceParentIdsWithNames(data);
        setTasks(namesparent);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  const handleAddTask = (task) => {
    fetch("http://127.0.0.1:8000/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((data) => {
        const parent = tasks.find((itm) => itm.id === data.parent);
        if (parent) {
          data.parentName = parent.title;
        }

        console.log(parent, data);
        setTasks([...tasks, data]);
      })
      .catch((error) => console.error("Error Adding task:", error));
  };

  const handleEditTask = (task) => {
    fetch(`http://127.0.0.1:8000/tasks/${task.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((data) => {
        const parent = tasks.find((itm) => itm.id.toString() === task.parent);
        if (parent) {
          task.parentName = parent.title;
        }
        const updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleDeleteTask = (task) => {
    fetch(`http://127.0.0.1:8000/tasks/${task.id}/`, {
      method: "DELETE",
    })
      .then(() => {
        fetchTasks();
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const [movedTask] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, movedTask);

    setTasks(newTasks);
  };

  const replaceParentIdsWithNames = (tasks) => {
    // Create a map to store task ids and their corresponding titles
    const idToTitleMap = new Map(tasks.map((task) => [task.id, task.title]));

    // Replace parent ids with parent names
    const updatedTasks = tasks.map((task) => ({
      ...task,
      parentName:
        task.parent !== null ? idToTitleMap.get(task.parent) || null : null,
    }));

    return updatedTasks;
  };

  return (
    <div className="container py-3">
      <h4 className="fw-normal">Todo List React Application</h4>

      <AddEditTodo
        tasks={tasks}
        activeTask={activeTask}
        onAddTask={handleAddTask}
        onEditTask={handleEditTask}
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <TodoList
          tasks={tasks}
          onForEdit={(task) => setActiveTask({ ...task })}
          onForDelete={handleDeleteTask}
        />
      </DragDropContext>
    </div>
  );
}

export default App;
