"use client";

import { useState } from "react";
import PlusIcon from "./_icons/plusIcon";
import { useFoodCategory } from "../_provider/foodCategory";
import { Island_Moments } from "next/font/google";

export default function DishesCategoryAdmin() {
  const { categories, loading, createCategory, deleteCategory } =
    useFoodCategory();

  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!categoryName.trim()) return;

    await createCategory(categoryName);
    setOpen(false);
    setCategoryName("");
    setIsLoading(false);
  };

  const totalFoods = categories.reduce((sum, c) => sum + c.foods.length, 0);

  return (
    <div className="flex flex-col w-full gap-6 flex-wrap">
      <div className="font-bold text-[20px]">Dishes Category</div>

      <div className="flex flex-wrap gap-3 w-full">
        <div className="text-center h-9 min-w-[140px] rounded-full border flex justify-center items-center gap-2">
          All dishes
          <div className="bg-black text-white rounded-full text-[12px] min-w-[28px] h-[20px] flex items-center justify-center">
            {totalFoods}
          </div>
        </div>

        {categories.map((item) => (
          <div
            key={item._id}
            className="relative group cursor-pointer p-2 border rounded-full bg-white border-[#E4E4E7] py-2 px-4 h-9 flex justify-center items-center gap-2"
          >
            {item.categoryName}
            <div className="bg-black text-white rounded-full text-[12px] min-w-[28px] h-[20px] flex items-center justify-center">
              {item.foods.length}
            </div>

            <button
              onClick={() => deleteCategory(item._id)}
              className="cursor-pointer absolute -right-3 -top-3 bg-red-500 w-6 h-6 rounded-full text-white text-sm hidden group-hover:flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={() => setOpen(true)}
          className="cursor-pointer w-9 h-9 rounded-full flex items-center justify-center text-white text-2xl bg-red-500"
        >
          <PlusIcon />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[460px] h-[272px] flex flex-col gap-6 relative justify-between">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Add new category</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-black text-xl hover:text-black w-9 h-9 rounded-full bg-[#F4F4F5]"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-[14px]">Category name</div>
              <input
                type="text"
                placeholder="type category name..."
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="border p-2 rounded-md w-full"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                disabled={isLoading}
                onClick={handleSubmit}
                className="px-4 py-2 rounded-md bg-black text-white h-10 w-[130px] flex justify-center items-center"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Add category"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
