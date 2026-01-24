import * as React from "react";
const TrashIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#EF4444"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2 4h12m-1.333 0v9.333c0 .667-.667 1.334-1.334 1.334H4.667c-.667 0-1.334-.667-1.334-1.334V4m2 0V2.667C5.333 2 6 1.333 6.667 1.333h2.666c.667 0 1.334.667 1.334 1.334V4"
    />
  </svg>
);
export default TrashIcon;
