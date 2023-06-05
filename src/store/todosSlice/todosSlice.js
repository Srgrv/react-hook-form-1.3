//packages
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTasksAsync = createAsyncThunk(
  "todos/getTasksAsync",
  async (_, { rejectWithValue, dispatch }) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=10`
    );
    return response.data;
  }
);

export const addTaskAsync = createAsyncThunk(
  "todos/addTaskAsync",
  async (value, { rejectWithValue, dispatch }) => {
    const response = await axios.post(
      `https://jsonplaceholder.typicode.com/todos`,
      {
        body: {
          title: value,
          completed: false,
          userId: 1,
        },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    dispatch(addTask({ value }));
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "todos/deleteTaskAsync",
  async (id, { rejectWithValue, dispatch }) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );

    dispatch(deleteTask({ id }));
  }
);

export const toggleTaskAsync = createAsyncThunk(
  "todos/toggleTaskAsync",
  async (id, { rejectWithValue, dispatch }) => {
    const response = await axios.patch(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );

    dispatch(toggleTask({ id }));
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    list: [],
  },
  reducers: {
    addTask(state, action) {
      state.list.push({
        id: new Date().toISOString(),
        title: action.payload.value,
        completed: false,
      });
    },
    deleteTask(state, action) {
      state.list = state.list.filter((todo) => todo.id !== action.payload.id);
    },
    toggleTask(state, action) {
      const change = state.list.find((todo) => todo.id === action.payload.id);
      change.completed = !change.completed;
    },
  },
  extraReducers: (build) => {
    build.addCase(getTasksAsync.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

const { addTask, deleteTask, toggleTask } = todosSlice.actions;
export default todosSlice.reducer;
