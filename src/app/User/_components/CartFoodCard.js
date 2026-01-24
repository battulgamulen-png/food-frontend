"use client";

import { useEffect } from "react";
import QuantityMinusIcon from "../_icons/quantityMinusIcon";
import QuantityPlusIcon from "../_icons/quantityPlusIcon";
import XIconRed from "../_icons/XIconRed";

export default function CartFoodCard({ item, increase, decrease, remove }) {
  const { foodName, foodIngredients, foodImage, foodPrice, quantity } = item;
  const totalPrice = foodPrice * quantity;

  return (
    <div className="flex flex-col bg-white rounded-[20px] items-start w-full">
      <div className="flex flex-row gap-4 bg-white rounded-[20px] items-start w-full">
        <div
          className="w-[124px] h-[120px] bg-cover bg-center rounded-xl shrink-0"
          style={{ backgroundImage: `url(${foodImage})` }}
        ></div>

        <div className="flex flex-col justify-between w-full h-[120px]">
          <div className="flex flex-row justify-between items-start w-full">
            <div className="flex flex-col min-w-0">
              <div className="text-[18px] font-bold text-red-500 leading-tight">
                {foodName}
              </div>

              <div className="text-[14px] text-gray-700 leading-tight">
                {foodIngredients}
              </div>
            </div>

            <div
              onClick={remove}
              className="cursor-pointer w-9 h-9 border border-red-500 rounded-full flex justify-center items-center shrink-0 ml-3"
            >
              <XIconRed />
            </div>
          </div>

          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-row gap-2 items-center">
              <button
                onClick={decrease}
                className="cursor-pointer border rounded-full border-black w-8 h-8 flex justify-center items-center"
              >
                <QuantityMinusIcon />
              </button>

              <div className="text-black">{quantity}</div>

              <button
                onClick={increase}
                className="cursor-pointer border rounded-full border-black w-8 h-8 flex justify-center items-center"
              >
                <QuantityPlusIcon />
              </button>
            </div>

            <div className="text-[16px] text-black font-bold">
              {totalPrice}₮
            </div>
          </div>
        </div>
      </div>

      <div
        className="h-px w-full mt-5"
        style={{ backgroundImage: "url('/line.png')" }}
      ></div>
    </div>
  );
}
