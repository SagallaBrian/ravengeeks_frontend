import { useState, useEffect } from "react";

function AddEditTodo({ tasks, onAddTask, activeTask, onEditTask }) {
  const [task, setTask] = useState({ ...activeTask });

  useEffect(() => {
    setTask({ ...activeTask });
  }, [activeTask]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setTask({
      ...task,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title } = task;
    if (title) {
      if (task.id) {
        onEditTask(task);
      } else {
        onAddTask(task);
      }
      resetForm();
    } else return;
  };

  const resetForm = () => {
    // Reset the form with a new task object
    setTask({
      title: "",
      completed: false,
      parent: null,
      id: null,
    });

    // Clear parent select value
    document.getElementById("parent").value = "";
  };

  return (
    <div className="py-3">
      <p className="fw-normal mb-0 pb-0">Todo Form</p>
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <div className="flex-grow-1">
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="Task Name"
                    value={task.title}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-4">
                <select
                  className="form-select"
                  name="parent"
                  id="parent"
                  value={task.parent || ""}
                  onChange={handleChange}
                >
                  <option value={null}>Select Parent (Optional)</option>
                  {tasks.map((task) => (
                    <option key={task.id} value={task.id}>
                      {task.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-2">
                <div className="mb-3 mt-2 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="completed"
                    name="completed"
                    checked={task.completed}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="completed">
                    Completed
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <button
              type="submit"
              className="btn btn-sm btn-outline-primary me-2"
            >
              Save Task
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-danger me-2"
              onClick={() => resetForm()}
            >
              Reset Form
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddEditTodo;
