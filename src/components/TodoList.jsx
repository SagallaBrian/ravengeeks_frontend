import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";

function TodoList({ tasks, onForEdit, onForDelete }) {
  return (
    <>
      <h5 className="fw-normal">Todo List</h5>
      <div className="row border-bottom p-2 bg-success-subtle ">
        <div className="col-lg-4">Title</div>
        <div className="col-lg-3">Parent Task</div>
        <div className="col-lg-2">Completed</div>
        <div className="col-lg-3">Action</div>
      </div>
      <Droppable droppableId="todo-list" type="group">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task
                      task={task}
                      onForEdit={onForEdit}
                      onForDelete={onForDelete}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
}

export default TodoList;
