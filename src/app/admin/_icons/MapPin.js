import * as React from "react";
const MapPin = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={19}
    fill="none"
    {...props}
  >
    <path
      stroke="#EF4444"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.083 7.417c0 5-6.666 10-6.666 10s-6.667-5-6.667-10a6.667 6.667 0 0 1 13.333 0Z"
    />
    <path
      stroke="#EF4444"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.417 9.917a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
    />
  </svg>
);
export default MapPin;
