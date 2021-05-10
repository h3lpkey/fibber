export function format_number(value: string, digits = 0): string {
  return parseFloat(value)
    .toFixed(digits)
    .replace(",", ".")
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const numberWithCommas = (x = 0, commas = " "): string => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, commas);
};