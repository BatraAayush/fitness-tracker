import {
  ADD_FOOD,
  DELETE_FOOD,
  SET_FOOD,
  SET_FOOD_ERROR,
  SET_FOOD_LOADING,
} from "../actions/foodActions";

const initialState = {
  food: [],
  input: {
    foodName: "",
    calories: 0,
    proteinGrams: 0,
    carbohydrates: 0,
    fatGrams: 0,
  },
  loading: false,
  error: null,
};

export const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOOD: {
      return {
        ...state,
        food: [...action.payload],
        loading: false,
        error: null,
      };
    }
    case SET_FOOD_LOADING: {
      return { ...state, loading: true };
    }
    case SET_FOOD_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    case ADD_FOOD: {
      return { ...state, food: [...state.food, action.payload] };
    }
    case DELETE_FOOD: {
      const updatedFood = state.food.filter(
        ({ _id }) => _id !== action.payload
      );
      return { ...state, food: updatedFood };
    }
    default:
      return { ...state };
  }
};
