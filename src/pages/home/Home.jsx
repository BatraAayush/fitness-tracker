import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllGoals } from "../../redux/actions/gaolActions";
import { getAllFood } from "../../redux/actions/foodActions";
import { getAllExercises } from "../../redux/actions/exerciseActions";
import "./Home.css";

export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllGoals());
    dispatch(getAllFood());
    dispatch(getAllExercises());
  }, [dispatch]);

  const allStates = useSelector((state) => state);
  const exercises = allStates.exerciseState.exercises;
  const goal = allStates.goalState.goal;
  const food = allStates.foodState.food;

  const totalExerciseCalories = exercises.reduce((acc, { caloriesBurned }) => {
    return acc + caloriesBurned;
  }, 0);
  const totalGoalCalories = goal.reduce((acc, { targetCaloriesValue }) => {
    return acc + targetCaloriesValue;
  }, 0);
  const totalFoodCalories = food.reduce((acc, { calories }) => {
    return acc + calories;
  }, 0);

  const remainingCalories = totalGoalCalories - totalExerciseCalories;
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div>
        <h3>Total calories burned: {totalExerciseCalories.toFixed(2)} kcal</h3>
        <h3>Total calories consumed: {totalFoodCalories.toFixed(2)} kcal</h3>
        <h3>Total calories goal: {totalGoalCalories.toFixed(2)} kcal</h3>
        <h3>
          Remaining calories to goal:{" "}
          {remainingCalories > 0 ? remainingCalories.toFixed(2) : 0}
        </h3>
      </div>
    </div>
  );
};
