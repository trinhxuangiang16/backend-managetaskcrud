import { statusCodes } from "./status-code.helper.js";

export class BadRequestException extends Error {
  constructor(message = "badRequestException") {
    super(message);
    this.code = statusCodes.BAD_REQUEST;
  }
}

//401: yều cầu FE logout
export class UnauthorizedException extends Error {
  constructor(message = "UnauthorizedException") {
    super(message);
    this.code = statusCodes.UNAUTHORIZED;
  }
}

//404: không tìm thấy
export class NotFountException extends Error {
  constructor(message = "NotFountException") {
    super(message);
    this.code = statusCodes.NOT_FOUND;
  }
}

//403: FE yêu cầu làm mới accessToken
export class ForbiddenException extends Error {
  constructor(message = "ForbiddenException") {
    super(message);
    this.code = statusCodes.FORBIDDEN;
  }
}
