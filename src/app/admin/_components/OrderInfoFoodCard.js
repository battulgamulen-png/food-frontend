"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronsUpDown, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import { useOrders } from "@/app/_provider/ordersProvider";
import { BACK_END_URL } from "@/app/_constants";
import Image from "next/image";

export default function OrderInfo({
  _id,
  totalPrice,
  createdAt,
  FoodOrderItems,
  deliveryLocation,
  status,
  index,
}) {
  const {
    orders,
    foods,
    openFoodId,
    setOpenFoodId,
    getOrders,
    selectedOrders,
    toggleSelectOrder,
  } = useOrders();

  const order = orders.find((o) => o._id === _id);
  const email = order?.userEmail;
  const [statusOpen, setStatusOpen] = useState(false);
  const statuses = ["pending", "delivered", "cancelled"];

  const updateStatus = async (newStatus) => {
    try {
      await axios.put(`${BACK_END_URL}/orders/${_id}/status`, {
        status: newStatus,
      });
      toast.success("Status updated");
      getOrders();
    } catch (err) {
      console.log(err);
    } finally {
      setStatusOpen(false);
    }
  };

  const handleOpenFood = () => setOpenFoodId(openFoodId === _id ? "" : _id);

  return (
    <div
      className={`flex flex-col w-full border ${
        selectedOrders.includes(_id) ? "bg-[#F4F4F5]" : ""
      }`}
    >
      <div className="flex flex-row w-full h-[56px] justify-between items-center border-b">
        <div className="p-4">
          <input
            type="checkbox"
            checked={selectedOrders.includes(_id)}
            onChange={() => toggleSelectOrder(_id)}
          />
        </div>
        <div className="P-4">{index}</div>
        <div className="min-w-[213px] p-4">{email}</div>

        <div className="w-[160px] p-4 relative">
          <div
            className="flex justify-between cursor-pointer"
            onClick={handleOpenFood}
          >
            {FoodOrderItems?.length || 0} foods <ChevronDown />
          </div>

          {_id === openFoodId && (
            <div className="absolute left-0 top-full mt-2 bg-white shadow-lg p-3 rounded z-50 w-[263px] border flex flex-col gap-3">
              {FoodOrderItems?.map((faa) => {
                const food = foods.find((f) => f._id === faa.food._id);
                return (
                  <div key={food._id} className="flex items-center gap-3 py-1">
                    <img
                      src={food?.foodImage}
                      className="w-8 h-8 rounded object-cover"
                      alt={food?.foodName}
                    />
                    <div className="flex justify-between w-full">
                      <span>{food?.foodName || "Unknown"}</span>
                      <span>x {faa.quantity}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="w-[160px] p-4">{createdAt?.slice(0, 10)}</div>
        <div className="p-4 w-[160px]">{totalPrice}</div>
        <div className="w-[213px] overflow-y-auto">{deliveryLocation}</div>

        <div className="w-[160px] flex items-center p-4 relative">
          <div
            className={`h-[32px] min-w-[94px] cursor-pointer flex items-center gap-[10px] border rounded-full px-[10px] ${
              status === "pending"
                ? "border-[#EF4444]"
                : status === "delivered"
                ? "border-[#18BA51]"
                : ""
            }`}
            onClick={() => setStatusOpen(!statusOpen)}
          >
            {status}
            <ChevronsUpDown />
          </div>

          {statusOpen && (
            <div className="absolute top-full mt-1 bg-white border rounded shadow w-40 z-50 flex flex-col">
              {statuses.map((st) => (
                <div
                  key={st}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => updateStatus(st)}
                >
                  {st}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
