import * as React from "react";
const PlusIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <path
      stroke="#EF4444"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.667 1v9.333M1 5.667h9.333"
    />
  </svg>
);
export default PlusIcon;
