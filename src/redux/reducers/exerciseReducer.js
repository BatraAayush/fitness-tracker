import {
  ADD_EXERCISE,
  DELETE_EXERCISE,
  SET_EXERCISES,
  SET_EXERCISE_ERROR,
  SET_EXERCISE_LOADING,
} from "../actions/exerciseActions";

const initialState = {
  exercises: [],
  input: {
    exerciseName: "",
    durationMinutes: 0,
  },
  loading: false,
  error: null,
};

export const exerciseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXERCISES: {
      return {
        ...state,
        exercises: [...action.payload],
        loading: false,
        error: null,
      };
    }
    case SET_EXERCISE_LOADING: {
      return { ...state, loading: true };
    }
    case SET_EXERCISE_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    case ADD_EXERCISE: {
      return { ...state, exercises: [...state.exercises, action.payload] };
    }
    case DELETE_EXERCISE: {
      const updatedExercises = state.exercises.filter(
        ({ _id }) => _id !== action.payload
      );
      return { ...state, exercises: updatedExercises };
    }
    default:
      return { ...state };
  }
};
