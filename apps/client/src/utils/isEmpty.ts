function isEmpty<T>(arr: T[]): boolean {
  return Array.isArray(arr) && !arr.length;
}

export default isEmpty;
