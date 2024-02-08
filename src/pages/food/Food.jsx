import { useSelector, useDispatch } from "react-redux";
import "./Food.css";
import { useEffect, useState } from "react";
import {
  addFoodAction,
  deleteFoodAction,
  getAllFood,
} from "../../redux/actions/foodActions";

export const Food = () => {
  const food = useSelector((state) => state.foodState.food);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [calories, setCalories] = useState(0);
  const [proteinGrams, setProteinGrams] = useState(0);
  const [carbohydrates, setCarbohydrates] = useState(0);
  const [fatGrams, setFatGrams] = useState(0);
  const [showAddBox, setShowAddBox] = useState(false);

  useEffect(() => {
    dispatch(getAllFood());
  }, [dispatch]);

  const addFood = () => {
    if (name === "") {
      alert("Invalid Input");
    } else {
      const inputData = {
        foodName: name,
        calories,
        proteinGrams,
        carbohydrates,
        fatGrams,
      };
      dispatch(addFoodAction(inputData));
      setName("");
      setCalories(0);
      setProteinGrams(0);
      setCalories(0);
      setFatGrams(0);
      setCarbohydrates(0);
      setShowAddBox(false);
    }
  };

  const deleteHandler = (id) => {
    dispatch(deleteFoodAction(id));
  };
  return (
    <div className="exercises">
      <button className="add-btn" onClick={() => setShowAddBox(!showAddBox)}>
        Add Food
      </button>
      {showAddBox && (
        <>
          <div id="myOverlay" onClick={() => setShowAddBox(false)}></div>
          <div className="add-exercise">
            <h2>Add Food</h2>
            <label>Name </label>
            <input
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label>Calories </label>
            <input
              value={calories}
              type="Number"
              onChange={(e) => setCalories(e.target.value)}
            />
            <br />
            <label>Protein (grams) </label>
            <input
              value={proteinGrams}
              type="Number"
              onChange={(e) => setProteinGrams(e.target.value)}
            />
            <br />
            <label>Carbohydrates (grams) </label>
            <input
              value={carbohydrates}
              type="Number"
              onChange={(e) => setCarbohydrates(e.target.value)}
            />
            <br />
            <label>Fat (grams) </label>
            <input
              value={fatGrams}
              type="Number"
              onChange={(e) => setFatGrams(e.target.value)}
            />
            <br />
            <button onClick={addFood}>ADD</button>
            <button onClick={() => setShowAddBox(false)}>Close</button>
          </div>
        </>
      )}
      <div className="exercise-list">
        {food.length !== 0 && <h2>Food</h2>}
        <ul>
          {food.map(
            ({
              _id,
              foodName,
              calories,
              proteinGrams,
              fatGrams,
              carbohydrates,
            }) => (
              <li key={_id}>
                <div>
                  <strong>Name:</strong> {foodName}
                </div>
                <div>
                  <strong>Calories:</strong> {calories} Kcal
                </div>
                <div>
                  <strong>Protein:</strong> {proteinGrams}
                </div>
                <div>
                  <strong>Fat:</strong> {fatGrams}
                </div>
                <div>
                  <strong>Carbohydrates:</strong> {carbohydrates}
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
