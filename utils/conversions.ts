export const convertLength = (value: number, from: string, to: string) => {
  const units: any = { m: 1, km: 1000, cm: 0.01 };
  return (value * units[from]) / units[to];
};

export const convertWeight = (value: number, from: string, to: string) => {
  const units: any = { kg: 1, g: 0.001, lb: 0.453592 };
  return (value * units[from]) / units[to];
};

export const convertTemperature = (value: number, from: string, to: string) => {
  if (from === "C" && to === "F") return (value * 9) / 5 + 32;
  if (from === "F" && to === "C") return ((value - 32) * 5) / 9;
  return value;
};

export const convertCurrency = (value: number, from: string, to: string) => {
  const rates: any = { USD: 1, NGN: 1500, EUR: 0.9 };
  return (value / rates[from]) * rates[to];
};