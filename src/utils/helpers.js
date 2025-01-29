

export function extractSuffixAfterDot(input) {
  const index = input.indexOf(".");
  return index !== -1 ? input.substring(index + 1) : null;
}
