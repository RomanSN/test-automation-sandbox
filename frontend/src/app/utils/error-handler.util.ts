export function getErrorMessage(error: any) {
  const message: string = error.response.data.message
    ? error.response.data.message
    : error.response.statusText
    ? `${error.response.statusText}; Server status ${error.response.status}`
    : error.message
    ? error.message
    : error;
  return message;
}
