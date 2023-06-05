//packages
import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

//styles
import "../styles/App.css";

//components
import Field from "./Field/Field";
import List from "./List/List";

//extra-reducers
import { getTasksAsync } from "../store/todosSlice/todosSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasksAsync());
  }, [dispatch]);
  return (
    <div>
      <Field />
      <List />
    </div>
  );
};

export default App;
