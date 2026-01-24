// CategoryWithItems.jsx
import axios from "axios";
import { useState, useEffect } from "react";
import AddNewFoodCard from "../_components/AddNewFood";
import AdminFoodCard from "../_components/adminFoodCards";
import { BACK_END_URL } from "@/app/_constants";

export default function CategoryWithItems() {
  const [categoryData, setCategoryData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(`${BACK_END_URL}/category`);
      setCategoryData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getData();
  }, []);

  // console.log("categoryData", categoryData);
  return (
    <div className="flex flex-col gap-4 w-full min-w-[1123px]">
      {categoryData.map((item, index) => (
        <div
          key={item._id || index}
          className="w-full min-h-[325px] p-5 border border-[#E4E4E7] flex flex-col gap-4 bg-white rounded-xl"
        >
          <div className="text-[20px] font-medium">
            {item.categoryName} ({item.foods.length})
          </div>

          <div className="flex flex-row gap-4 flex-wrap">
            <AddNewFoodCard
              categoryId={item._id}
              categoryName={item.categoryName}
            />
            {item.foods.map((food) => (
              <AdminFoodCard
                key={food._id}
                {...food}
                categoryData={categoryData}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
