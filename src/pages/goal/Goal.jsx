import { useSelector, useDispatch } from "react-redux";
import "./Goal.css";
import { useEffect, useState } from "react";
import {
  addGoalAction,
  deleteGoalAction,
  getAllGoals,
} from "../../redux/actions/gaolActions";

export const Goal = () => {
  const goal = useSelector((state) => state.goalState.goal);
  const dispatch = useDispatch();
  const [goalName, setGoalName] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [targetCaloriesValue, setTargetCaloriesValue] = useState(0);
  const [status, setStaus] = useState("In Progress");
  const [showAddBox, setShowAddBox] = useState(false);

  useEffect(() => {
    dispatch(getAllGoals());
  }, [dispatch]);

  const addGoal = () => {
    if (
      goalName === "" ||
      description === "" ||
      targetDate === "" ||
      targetCaloriesValue === 0
    ) {
      alert("invalid input");
    } else {
      const inputData = {
        goalName,
        description,
        targetDate,
        targetCaloriesValue,
        status,
      };
      dispatch(addGoalAction(inputData));
      setGoalName("");
      setDescription("");
      setTargetDate("");
      setTargetCaloriesValue(0);
      setStaus("In Progress");
      setShowAddBox(false);
    }
  };

  const deleteHandler = (id) => {
    dispatch(deleteGoalAction(id));
  };

  return (
    <div className="exercises">
      <button className="add-btn" onClick={() => setShowAddBox(!showAddBox)}>
        Add Goal
      </button>
      {showAddBox && (
        <>
          <div id="myOverlay" onClick={() => setShowAddBox(false)}></div>
          <div className="add-exercise">
            <h2>Add Goal</h2>
            <label>Name </label>
            <input
              value={goalName}
              type="text"
              onChange={(e) => setGoalName(e.target.value)}
            />
            <br />
            <label>Description </label>
            <input
              value={description}
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <label>Target Date</label>
            <input
              value={targetDate}
              type="text"
              onChange={(e) => setTargetDate(e.target.value)}
            />
            <br />
            <label>Target Clories Value</label>
            <input
              value={targetCaloriesValue}
              type="Number"
              onChange={(e) => setTargetCaloriesValue(e.target.value)}
            />
            <br />
            <label>Status</label>
            <select value={status} onChange={(e) => setStaus(e.target.value)}>
              <option value="In Progress">In Progress</option>
              <option value="Abandoned">Abandoned</option>
              <option value="Archived">Archived</option>
            </select>
            <br />
            <button onClick={addGoal}>ADD</button>
            <button onClick={() => setShowAddBox(false)}>Close</button>
          </div>
        </>
      )}
      <div className="exercise-list">
        {goal.length !== 0 && <h2>Goals</h2>}
        <ul>
          {goal.map(
            ({
              _id,
              goalName,
              description,
              targetDate,
              targetCaloriesValue,
              status,
            }) => (
              <li key={_id}>
                <div>
                  <strong>Name:</strong> {goalName}
                </div>
                <div>
                  <strong>Description:</strong> {description}
                </div>
                <div>
                  <strong>Target Date:</strong> {targetDate}
                </div>
                <div>
                  <strong>Target Calories Value:</strong> {targetCaloriesValue}
                </div>
                <div>
                  <strong>Status:</strong> {status}
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
