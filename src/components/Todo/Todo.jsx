//packages
import React from "react";
import { useDispatch } from "react-redux";

//extra-reducers
import { deleteTaskAsync } from "../../store/todosSlice/todosSlice";
import { toggleTaskAsync } from "../../store/todosSlice/todosSlice";

const Todo = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleTaskAsync(id))}
      />
      <span>{title}</span>
      <span onClick={() => dispatch(deleteTaskAsync(id))}>&times;</span>
    </div>
  );
};

export default Todo;
