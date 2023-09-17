export function average(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b) / numbers.length;
}

export function weightedAverage(numbers: number[], weights: number[]): number {
  const totalWeight = weights.reduce((a, b) => a + b);
  return numbers.reduce((a, b, i) => a + b * (weights[i] / totalWeight), 0);
}

export function normalizeToSum(values: number[]): number[] {
  const total = values.reduce((acc, value) => acc + value, 0);
  return values.map(value => value / total);
}

export function normalizeToRange(values: number[]): number[] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  return values.map(value => (value - min) / range);
}