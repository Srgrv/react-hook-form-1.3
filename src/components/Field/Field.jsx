//packages
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

//extra-reducers
import { addTaskAsync } from "../../store/todosSlice/todosSlice";

const Field = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(addTaskAsync(data.addTask));
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input
            {...register("addTask", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 2,
                message: "Должно быть не менее двух символов",
              },
            })}
          />
          <input type="submit" value="addTask" />
        </label>
        <div>
          {errors?.addTask && <p>{errors?.addTask?.message || "Errors"}</p>}
        </div>
      </form>
    </div>
  );
};

export default Field;
