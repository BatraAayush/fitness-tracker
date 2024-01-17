import { useSelector, useDispatch } from "react-redux";
import "./Exercises.css";
import { useEffect, useState } from "react";
import {
  addExerciseAction,
  deleteExerciseAction,
  getAllExercises,
} from "../../redux/actions/exerciseActions";

export const Exercises = () => {
  const exercises = useSelector((state) => state.exerciseState.exercises);
  const dispatch = useDispatch();
  const [name, setName] = useState("Cycling");
  const [duration, setDuration] = useState(0);
  const [showAddBox, setShowAddBox] = useState(false);

  useEffect(() => {
    dispatch(getAllExercises());
  }, [dispatch]);

  const addExercise = () => {
    if (duration === 0) {
      alert("Invalid Input");
    } else {
      const inputData = {
        exerciseName: name,
        durationMinutes: duration,
      };
      dispatch(addExerciseAction(inputData));
      setName("Cycling");
      setDuration(0);
      setShowAddBox(false);
    }
  };

  const deleteHandler = (id) => {
    dispatch(deleteExerciseAction(id));
  };
  return (
    <div className="exercises">
      <button className="add-btn" onClick={() => setShowAddBox(!showAddBox)}>
        Add Exercise
      </button>
      {showAddBox && (
        <>
          <div id="myOverlay" onClick={() => setShowAddBox(false)}></div>
          <div className="add-exercise">
            <h2>Add Exercise</h2>
            <label>Name </label>
            <select value={name} onChange={(e) => setName(e.target.value)}>
              <option value="Cycling">Cycling</option>
              <option value="Running">Running</option>
              <option value="Swimming">Swimming</option>
              <option value="Jumping">Jumping</option>
              <option value="Basketball">Basketball</option>
            </select>
            <br />
            <label>Duration (min)</label>
            <input
              value={duration}
              type="Number"
              onChange={(e) => setDuration(e.target.value)}
            />
            <br />
            <button onClick={addExercise}>ADD</button>
            <button onClick={() => setShowAddBox(false)}>Close</button>
          </div>
        </>
      )}
      <div className="exercise-list">
        {exercises.length !== 0 && <h2>Exercises</h2>}
        <ul>
          {exercises.map(
            ({ _id, exerciseName, durationMinutes, caloriesBurned }) => (
              <li key={_id}>
                <div>
                  <strong>Name:</strong> {exerciseName}
                </div>
                <div>
                  <strong>Duration:</strong> {durationMinutes} min
                </div>
                <div>
                  <strong>Calories Burned:</strong> {caloriesBurned.toFixed(2)}{" "}
                  Kcal
                </div>
                <button onClick={() => deleteHandler(_id)}>Delete</button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};
