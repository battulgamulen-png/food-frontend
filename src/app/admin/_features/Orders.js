// "use client";

// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import OrderInfo from "../_components/OrderInfoFoodCard";
// import { useOrders } from "@/app/_provider/ordersProvider";
// import { ChevronDown, ChevronsUpDown } from "lucide-react";

// export default function Orders() {
//   const { currentItems, currentPage, setCurrentPage, totalPages, setSortType } =
//     useOrders();

//   return (
//     <div className="relative">
//       <div className="flex flex-row w-full h-[56px] items-center border-b justify-between border">
//         <div className="p-4">
//           <input type="checkbox" />
//         </div>

//         <div className="P-4">№</div>

//         <div className="min-w-[213px] p-4">Customer email</div>

//         <div className="w-[160px] p-4">Food</div>

//         <div
//           onClick={() =>
//             setSortType((prev) =>
//               prev === "date-asc" ? "date-desc" : "date-asc"
//             )
//           }
//           className="w-[160px] p-4 flex items-center gap-2 cursor-pointer"
//         >
//           Date <ChevronsUpDown />
//         </div>

//         <div className="w-[160px] p-4">Total</div>

//         <div className="w-[213px] p-4">Delivery address</div>

//         <div
//           onClick={() =>
//             setSortType((prev) =>
//               prev === "status-asc" ? "status-desc" : "status-asc"
//             )
//           }
//           className="min-w-[160px] p-4 flex items-center gap-2 cursor-pointer justify-between"
//         >
//           Delivery state <ChevronsUpDown />
//         </div>
//       </div>

//       {currentItems.map((order, index) => (
//         <OrderInfo key={order._id} {...order} index={index + 1} />
//       ))}

//       <div className="mt-4 flex justify-center">
//         <Pagination>
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious
//                 onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//               />
//             </PaginationItem>

//             {Array.from({ length: totalPages }).map((_, i) => (
//               <PaginationItem key={i}>
//                 <PaginationLink
//                   isActive={currentPage === i + 1}
//                   onClick={() => setCurrentPage(i + 1)}
//                 >
//                   {i + 1}
//                 </PaginationLink>
//               </PaginationItem>
//             ))}

//             <PaginationItem>
//               <PaginationNext
//                 onClick={() =>
//                   setCurrentPage((p) => Math.min(p + 1, totalPages))
//                 }
//               />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       </div>
//       {}
//     </div>
//   );
// }
