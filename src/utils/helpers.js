export function extractSuffixAfterDot(input) {
  const index = input.indexOf(".");
  return index !== -1 ? input.substring(index + 1) : null;
}

export const truncateTitle = (title, maxLength) => {
  if (!title) return "";
  return title.length > maxLength
    ? `${title.substring(0, maxLength)}...`
    : title;
};
