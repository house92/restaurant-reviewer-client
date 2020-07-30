import React, { useState } from 'react';

const baseStyle = {
  outline: 'none',
  cursor: 'pointer',
};

export default function Button({
  text,
  style = {},
  hoverBackgroundColor = '#f90909',
  ...props
}) {
  const [isHover, setIsHover] = useState(false);
  const appliedStyle = {
    ...baseStyle,
    ...JSON.parse(JSON.stringify(style)),
  };

  if (isHover) {
    appliedStyle.backgroundColor = hoverBackgroundColor;
    appliedStyle.color = '#fff';
    appliedStyle.fontWeight = (appliedStyle.fontWeight || 0) < 500 ? 500 : appliedStyle.fontWeight;
  }

  return (
    <button
      style={appliedStyle}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      {...props}
    >
      {text}
    </button>
  );
}
