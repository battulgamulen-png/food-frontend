import * as React from "react";
const ChevronLeft = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#18181B"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 12 6 8l4-4"
    />
  </svg>
);
export default ChevronLeft;
