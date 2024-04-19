import axios from "axios";

export const SET_FOOD_LOADING = "set_food_loading";
export const SET_FOOD = "set_food";
export const SET_FOOD_ERROR = "set_food_error";
export const ADD_FOOD = "add_food";
export const DELETE_FOOD = "delete_food";

const baseURL = "https://assignment-17-one.vercel.app/api";

const getFood = async () => {
  try {
    const response = await axios.get(`${baseURL}/food`);
    return response.data.allFoodItems;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getAllFood = () => async (dispatch) => {
  try {
    dispatch({ type: SET_FOOD_LOADING });
    const food = await getFood();
    dispatch({ type: SET_FOOD, payload: food });
  } catch (err) {
    dispatch({ type: SET_FOOD_ERROR, payload: err.message });
  }
};

const addFood = async (food) => {
  try {
    const response = await axios.post(`${baseURL}/food`, {
      ...food,
    });
    return response.data.addedFood;
  } catch (e) {
    throw e;
  }
};

export const addFoodAction = (input) => async (dispatch) => {
  try {
    dispatch({ type: SET_FOOD_LOADING });
    const food = await addFood(input);
    dispatch({ type: ADD_FOOD, payload: food });
  } catch (err) {
    dispatch({ type: SET_FOOD_ERROR, payload: err.message });
  }
};

const deleteFood = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/food/${id}`);
    return response.data.message;
  } catch (e) {
    throw e;
  }
};

export const deleteFoodAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_FOOD_LOADING });
    const message = await deleteFood(id);
    console.log(message);
    dispatch({ type: DELETE_FOOD, payload: id });
  } catch (e) {
    dispatch({ type: SET_FOOD_ERROR, payload: e.message });
  }
};
