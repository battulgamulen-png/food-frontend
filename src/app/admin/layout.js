"use client";

import { FoodCategoryProvider } from "../_provider/foodCategory";
import { OrdersProvider } from "../_provider/ordersProvider";

export default function AdminLayout({ children }) {
  return (
    <FoodCategoryProvider>
      <OrdersProvider>{children}</OrdersProvider>
    </FoodCategoryProvider>
  );
}
