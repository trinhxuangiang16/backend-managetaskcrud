export function responseSuccess(data, message = "ok", statusCode = 200) {
  //CHổ dấu bằng là set default
  return {
    status: "success",
    statusCode: statusCode,
    message: message,
    data: data,
    doc: "example.com",
  };
}
export function responseError(
  message = "Internal Server Error",
  statusCode = 500,
  stack = null,
) {
  return {
    status: "error",
    statusCode: statusCode,
    message: message,
    stack: stack,
    doc: "example.com",
  };
}
