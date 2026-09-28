const colorMap = {
  green: "#64d583",
  blue: "#91a8f9",
  orange: "#ee955e",
  pink: "#ee92d7",
  purple: "#aa8ef0",
  yellow: "#f5d770",
  default: "#64d583",
};

function hexToString(hexCode) {
  const colorName = Object.keys(colorMap).find(
    (key) => colorMap[key] === hexCode
  );

  return colorName || null;
}

export { colorMap, hexToString };
