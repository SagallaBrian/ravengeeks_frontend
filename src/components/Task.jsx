function Task({ task, onForEdit, onForDelete }) {
  return (
    <div className="row border-bottom p-2">
      <div className="col-lg-4">{task.title}</div>
      <div className="col-lg-3">
        {task.parentName ? task.parentName : "----"}
      </div>
      <div className="col-lg-2">{task.completed ? "True" : "False"}</div>
      <div className="col-lg-3">
        <button
          className="btn btn-sm btn-outline-primary me-2"
          onClick={() => onForEdit(task)}
        >
          Edit Task
        </button>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => onForDelete(task)}
        >
          Delete Task
        </button>
      </div>
    </div>
  );
}

export default Task;
