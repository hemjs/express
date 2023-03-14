export function getStatusCode(error: Error | any): number {
  let status = error.statusCode;

  if (!status || status < 400 || status >= 600) {
    status = 500;
  }

  return status;
}
