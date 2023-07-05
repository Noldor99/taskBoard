export function parseQueryId(id: string | string[]): number {
  if (typeof id === 'string') {
    return parseInt(id);
  }
  if (Array.isArray(id)) {
    return parseInt(id[0]);
  }
  throw new Error('Invalid category id');
}
