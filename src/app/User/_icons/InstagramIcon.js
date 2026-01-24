import * as React from "react";
const InstagramIcon = (props) => (
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
export default InstagramIcon;
