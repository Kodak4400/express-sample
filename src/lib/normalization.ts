export function normalizePort(val: string): number | boolean {
  const port = parseInt(val, 10);

  if(isNaN(port)) {
    return false
  }

  return port;
}
