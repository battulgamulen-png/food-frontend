"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { BACK_END_URL } from "../_constants";

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [foods, setFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openFoodId, setOpenFoodId] = useState("");
  const itemsPerPage = 15;
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [refreshSignal, setRefreshSignal] = useState(0);
  const [filterDates, setFilterDates] = useState({ start: null, end: null });

  const sortOrders = (orders, sortType) => {
    const sorted = [...orders];

    switch (sortType) {
      case "date-asc":
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "date-desc":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "status-asc":
        sorted.sort((a, b) => a.status.localeCompare(b.status));
        break;
      case "status-desc":
        sorted.sort((a, b) => b.status.localeCompare(a.status));
        break;
      default:
        break;
    }

    return sorted;
  };

  const sortedOrders = sortOrders(orders, sortType);
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = sortedOrders.slice(indexOfFirst, indexOfLast);

  const getOrders = async () => {
    try {
      const res = await axios.get(`${BACK_END_URL}/orders`);
      const ordersWithEmail = res.data.map((order) => ({
        ...order,
        userEmail: order.user?.email || "Unknown",
      }));

      setOrders(ordersWithEmail);
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

  const updateSelectedStatus = async (newStatus) => {
    try {
      await Promise.all(
        selectedOrders.map((id) =>
          axios.put(`${BACK_END_URL}/orders/${id}/status`, {
            status: newStatus,
          })
        )
      );
      toast.success("Selected orders updated");
      getOrders();
      setSelectedOrders([]);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSelectOrder = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getFoods();
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getOrders();
  }, []);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        getOrders,
        foods,
        getFoods,
        currentItems,
        currentPage,
        setCurrentPage,
        totalPages,
        openFoodId,
        setOpenFoodId,
        updateSelectedStatus,
        selectedOrders,
        setSelectedOrders,
        toggleSelectOrder,
        setSortType,
        refreshSignal,
        setRefreshSignal,
        setFilterDates,
        filterDates,
        sortOrders,
        sortType,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}
