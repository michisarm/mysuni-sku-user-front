const PROTOCOL = window.location.protocol;
const HOST = window.location.host;

export function hanleUnAuthorizedError(error: any): undefined {
  if (error.response.status === 401) {
    window.location.href = `${PROTOCOL}//${HOST}/login`;
    return undefined;
  }
  return undefined;
}
