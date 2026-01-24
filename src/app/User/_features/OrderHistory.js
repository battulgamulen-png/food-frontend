"use client";

import { useEffect, useState } from "react";
import OrderHistoryCard from "../_components/OrderHistoryCard";
import axios from "axios";
import { BACK_END_URL } from "@/app/_constants";

export default function OrderHistory() {
  const token = localStorage.getItem("token");

  const [orderData, setOrderData] = useState([]);
  const [foods, setFoods] = useState([]);

  const getOrder = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BACK_END_URL}/orders/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrderData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getFoods = async () => {
    try {
      const res = await axios.get(`${BACK_END_URL}/food`);
      setFoods(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("orderData", orderData);
  console.log("foods", foods);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getFoods();
    getOrder();
  }, []);
  return (
    <div>
      <div className="text-white h-full bg-white rounded-[20px] flex flex-col gap-5">
        <div className="text-black text-[20px] font-bold">Order history</div>
        <div className="flex flex-col gap-5 overflow-y-auto">
          {orderData.map((order) => (
            <OrderHistoryCard key={order._id} order={order} foods={foods} />
          ))}
        </div>
      </div>{" "}
    </div>
  );
}
