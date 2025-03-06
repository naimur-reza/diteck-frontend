const projectBgColors = [
  "bg-[#141414]",
  "bg-[#324253]",
  "bg-[#526648]",
  "bg-[#4B5355]",
  "bg-[#6B3333]",
];

export const getProjectBgColor = (index: number) => {
  if (index < 0 || index >= projectBgColors.length) {
    return null;
  }
  return projectBgColors[index];
};
