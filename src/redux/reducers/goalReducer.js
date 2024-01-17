import {
  ADD_GOAL,
  DELETE_GOAL,
  SET_GOAL,
  SET_GOAL_ERROR,
  SET_GOAL_LOADING,
} from "../actions/gaolActions";

const initialState = {
  goal: [],
  input: {
    goalName: "",
    description: "",
    targetDate: "",
    targetCaloriesValue: 0,
    status: "In Progress",
  },
  loading: false,
  error: null,
};

export const goalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GOAL: {
      return {
        ...state,
        goal: [...action.payload],
        loading: false,
        error: null,
      };
    }
    case SET_GOAL_LOADING: {
      return { ...state, loading: true };
    }
    case SET_GOAL_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    case ADD_GOAL: {
      return { ...state, goal: [...state.goal, action.payload] };
    }
    case DELETE_GOAL: {
      const updatedGoal = state.goal.filter(
        ({ _id }) => _id !== action.payload
      );
      return { ...state, goal: updatedGoal };
    }
    default:
      return { ...state };
  }
};
