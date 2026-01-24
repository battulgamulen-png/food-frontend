import * as React from "react";
const FacebookIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <path fill="url(#a)" d="M0 0h28v27.035H0z" />
    <defs>
      <pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#b" transform="scale(.00862 .00893)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={116}
        height={112}
        preserveAspectRatio="none"
      />
    </defs>
  </svg>
);
export default FacebookIcon;
