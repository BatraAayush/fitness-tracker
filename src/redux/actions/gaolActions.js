import axios from "axios";

export const SET_GOAL_LOADING = "set_goal_loading";
export const SET_GOAL = "set_goal";
export const SET_GOAL_ERROR = "set_goal_error";
export const ADD_GOAL = "add_goal";
export const DELETE_GOAL = "delete_goal";

const baseURL = "https://assignment-17-one.vercel.app/api";

const getGoal = async () => {
  try {
    const response = await axios.get(`${baseURL}/goals`);
    return response.data.allGoals;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getAllGoals = () => async (dispatch) => {
  try {
    dispatch({ type: SET_GOAL_LOADING });
    const goal = await getGoal();
    dispatch({ type: SET_GOAL, payload: goal });
  } catch (err) {
    dispatch({ type: SET_GOAL_ERROR, payload: err.message });
  }
};

const addGoal = async (goal) => {
  try {
    const response = await axios.post(`${baseURL}/goals`, {
      ...goal,
    });
    return response.data.addedGoal;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const addGoalAction = (input) => async (dispatch) => {
  try {
    dispatch({ type: SET_GOAL_LOADING });
    const goal = await addGoal(input);
    dispatch({ type: ADD_GOAL, payload: goal });
  } catch (err) {
    dispatch({ type: SET_GOAL_ERROR, payload: err.message });
  }
};

const deleteGoal = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/goals/${id}`);
    return response.data.message;
  } catch (e) {
    throw e;
  }
};

export const deleteGoalAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_GOAL_LOADING });
    const message = await deleteGoal(id);
    console.log(message);
    dispatch({ type: DELETE_GOAL, payload: id });
  } catch (e) {
    dispatch({ type: SET_GOAL_ERROR, payload: e.message });
  }
};
