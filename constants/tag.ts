export const TAGS = ["High", "Medium", "Low"];

export const getTagColor = (tag: string) => {
  if (tag === "High") return "#ef4444";
  if (tag === "Medium") return "#f59e0b";
  return "#10b981";
};