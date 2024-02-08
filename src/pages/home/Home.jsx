import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllGoals } from "../../redux/actions/gaolActions";
import { getAllFood } from "../../redux/actions/foodActions";
import { getAllExercises } from "../../redux/actions/exerciseActions";
import "./Home.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

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

  const remainingCalories =
    totalGoalCalories - totalExerciseCalories > 0
      ? totalGoalCalories - totalExerciseCalories
      : 0;

  const data = {
    labels: [
      "Calories Burned",
      "Calories Consumed",
      "Calories Goal",
      "Remaining Goal",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [
          totalExerciseCalories,
          totalFoodCalories,
          totalGoalCalories,
          remainingCalories,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <Doughnut data={data} />
      <div>
        <h3 style={{ color: "rgba(255, 99, 132)" }}>
          Total Calories Burned: {totalExerciseCalories.toFixed(2)} Kcal
        </h3>
        <h3 style={{ color: "rgba(54, 162, 235)" }}>
          Total Calories Consumed: {totalFoodCalories.toFixed(2)} Kcal
        </h3>
        <h3 style={{ color: "rgba(255, 206, 86)" }}>
          Total Calories Goal: {totalGoalCalories.toFixed(2)} Kcal
        </h3>
        <h3 style={{ color: "rgba(75, 192, 192, 1)" }}>
          Remaining Calories To Goal: {remainingCalories.toFixed(2)} Kcal
        </h3>
      </div>
    </div>
  );
};
