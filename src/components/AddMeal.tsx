const AddMeal = () => {
    const addMeal = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

     
      alert("Meal added successfully!");
    }
  return (
    <div className="pt-[150px] flex justify-center">
      <div className="w-7xl">
        <div className="text-bold text-4xl my-3">Add Meal</div>
        <p className="text-gray-500">Log your meal manually to track your daily intake</p>
        <div className="w-2/3 border rounded-2xl p-6 mt-6">
          <form className="space-y-6" onSubmit={addMeal}>
            <div className="flex flex-col">
              <label htmlFor="mealName"> Food Name </label>
              <input className="border rounded-2xl border-gray-600 py-2 px-4" type="text" id="mealName" required placeholder="e.g., Grilled Chicken" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="calories"> Calories </label>
              <input className="border rounded-2xl border-gray-600 py-2 px-4" type="number" id="calories" required placeholder="e.g., 350" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="mealType"> Meal Type </label>
              <input className="border rounded-2xl border-gray-600 py-2 px-4" type="text" id="mealType" required placeholder="e.g., Breakfast, Lunch, Dinner" />
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <label htmlFor="protein"> Protein </label>
                <input className="border rounded-2xl border-gray-600 py-2 px-2" type="number" id="protein" required placeholder="0" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="carbs"> Carbs(g) </label>
                <input className="border rounded-2xl border-gray-600 py-2 px-2" type="number" id="carbs" required placeholder="0" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="fats"> Fats(g) </label>
                <input className="border rounded-2xl border-gray-600 py-2 px-2" type="number" id="fats" required placeholder="0" />
              </div>
            </div>
            <button className="bg-gray-600 text-white rounded-2xl p-3 w-full" type="submit">Add Meal</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMeal;
