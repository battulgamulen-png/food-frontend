import * as React from "react";
const CartIcon = (props) => (
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
      d="M1.367 1.366h1.334l1.773 8.28A1.334 1.334 0 0 0 5.807 10.7h6.52a1.333 1.333 0 0 0 1.3-1.046l1.1-4.953H3.414M6 14a.667.667 0 1 1-1.334 0 .667.667 0 0 1 1.334 0Zm7.333 0A.667.667 0 1 1 12 14a.667.667 0 0 1 1.334 0Z"
    />
  </svg>
);
export default CartIcon;
