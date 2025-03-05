export function addSpacesToCamelCase(str: string) {
  if (!str) {
    console.error("addSpacesToCamelCase called with undefined or empty string");
    return "";
  }
  return str.replace(/([a-z])([A-Z])/g, '$1 $2');
}