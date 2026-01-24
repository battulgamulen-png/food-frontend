"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BACK_END_URL } from "../_constants";

const FoodCategoryContext = createContext(null);

export const useFoodCategory = () => {
  const context = useContext(FoodCategoryContext);
  if (!context) {
    throw new Error(
      "useFoodCategory must be used inside a <FoodCategoryProvider>"
    );
  }
  return context;
};

export const FoodCategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACK_END_URL}/category`);
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (name) => {
    try {
      const token = localStorage.getItem("token") || "";
      await axios.post(
        `${BACK_END_URL}/category`,
        { categoryName: name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Category created!");
      fetchCategories();
    } catch (err) {
      console.log(err);
      toast.error("Create failed");
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${BACK_END_URL}/category/${id}`);
      toast.success("Category deleted!");
      fetchCategories();
    } catch (err) {
      toast.error("Delete failed!");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <FoodCategoryContext.Provider
      value={{
        categories,
        loading,
        createCategory,
        deleteCategory,
      }}
    >
      {children}
    </FoodCategoryContext.Provider>
  );
};
