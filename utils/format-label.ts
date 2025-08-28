export function formatLabel(label: string) {
  return label.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/_/g, " ");
}
