import axios from "axios";

export const SET_EXERCISE_LOADING = "set_exercise_loading";
export const SET_EXERCISES = "set_exercises";
export const SET_EXERCISE_ERROR = "set_exercise_error";
export const ADD_EXERCISE = "add_exercise";
export const DELETE_EXERCISE = "delete_exercise";

const baseURL = "https://assignment-17-one.vercel.app/api";

const getExercises = async () => {
  try {
    const response = await axios.get(`${baseURL}/exercises`);
    return response.data.allExercises;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getAllExercises = () => async (dispatch) => {
  try {
    dispatch({ type: SET_EXERCISE_LOADING });
    const exercises = await getExercises();
    dispatch({ type: SET_EXERCISES, payload: exercises });
  } catch (err) {
    dispatch({ type: SET_EXERCISE_ERROR, payload: err.message });
  }
};

const calculateCalories = (input) => {
  switch (input.exerciseName) {
    case "Cycling": {
      return 7.7 * input.durationMinutes;
    }
    case "Running": {
      return 10.5 * input.durationMinutes;
    }
    case "Swimming": {
      return 7.8 * input.durationMinutes;
    }
    case "Jumping": {
      return 12.4 * input.durationMinutes;
    }
    case "Basketball": {
      return 8.9 * input.durationMinutes;
    }
    default:
      return 0;
  }
};

const addExercise = async (input) => {
  try {
    const exercise = { ...input, caloriesBurned: calculateCalories(input) };
    const response = await axios.post(`${baseURL}/exercises`, {
      ...exercise,
    });
    return response.data.addedExercise;
  } catch (e) {
    throw e;
  }
};

export const addExerciseAction = (input) => async (dispatch) => {
  try {
    dispatch({ type: SET_EXERCISE_LOADING });
    const exercise = await addExercise(input);
    dispatch({ type: ADD_EXERCISE, payload: exercise });
  } catch (err) {
    dispatch({ type: SET_EXERCISE_ERROR, payload: err.message });
  }
};

const deleteExercise = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/exercises/${id}`);
    return response.data.message;
  } catch (e) {
    throw e;
  }
};

export const deleteExerciseAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_EXERCISE_LOADING });
    const message = await deleteExercise(id);
    console.log(message);
    dispatch({ type: DELETE_EXERCISE, payload: id });
  } catch (e) {
    dispatch({ type: SET_EXERCISE_ERROR, payload: e.message });
  }
};
