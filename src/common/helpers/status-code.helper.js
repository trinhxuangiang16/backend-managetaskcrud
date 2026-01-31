export const statusCodes = {
  CONTINUE: 100, //Lỗi này là tạm thời, client nên tiếp tục với yêu cầu của mình
  SWITCHING_PROTOCOLS: 101, //Client yêu cầu server chuyển đổi giao thức
  PROCESSING: 102, //Yêu cầu đã được nhận và đang được xử lý
  OK: 200, //thành công
  CREATED: 201, //tạo thành công
  ACCEPTED: 202, //chấp nhận yêu cầu nhưng chưa xử lý xong
  NON_AUTHORITATIVE_INFORMATION: 203, //Thông tin không chính thức
  NO_CONTENT: 204, //không có nội dung
  RESET_CONTENT: 205, //đặt lại nội dung
  PARTIAL_CONTENT: 206, //nội dung một phần
  MULTI_STATUS: 207, //trạng thái đa dạng
  MULTIPLE_CHOICES: 300, //nhiều lựa chọn
  MOVED_PERMANENTLY: 301, //di chuyển vĩnh viễn
  MOVED_TEMPORARILY: 302, //di chuyển tạm thời
  SEE_OTHER: 303, //xem ở nơi khác
  NOT_MODIFIED: 304, //không thay đổi
  USE_PROXY: 305, //sử dụng proxy
  TEMPORARY_REDIRECT: 307, //chuyển hướng tạm thời
  PERMANENT_REDIRECT: 308, //chuyển hướng vĩnh viễn
  BAD_REQUEST: 400, //yêu cầu không hợp lệ
  UNAUTHORIZED: 401, //chưa xác thực
  PAYMENT_REQUIRED: 402, //yêu cầu thanh toán
  FORBIDDEN: 403, //cấm truy cập
  NOT_FOUND: 404, //không tìm thấy
  METHOD_NOT_ALLOWED: 405, //phương thức không được phép
  NOT_ACCEPTABLE: 406, //không chấp nhận được
  PROXY_AUTHENTICATION_REQUIRED: 407, //yêu cầu xác thực proxy
  REQUEST_TIMEOUT: 408, //yêu cầu hết thời gian
  CONFLICT: 409, //xung đột
  GONE: 410, //đã bị xóa
  LENGTH_REQUIRED: 411, //yêu cầu độ dài
  PRECONDITION_FAILED: 412, //tiền điều kiện thất bại
  REQUEST_TOO_LONG: 413, //yêu cầu quá dài
  REQUEST_URI_TOO_LONG: 414, //URI yêu cầu quá dài
  UNSUPPORTED_MEDIA_TYPE: 415, //định dạng không được hỗ trợ
  REQUESTED_RANGE_NOT_SATISFIABLE: 416, //phạm vi yêu cầu không thỏa mãn
  EXPECTATION_FAILED: 417, //mong đợi thất bại
  IM_A_TEAPOT: 418, //tôi là một ấm trà
  INSUFFICIENT_SPACE_ON_RESOURCE: 419, //không đủ không gian trên tài nguyên
  METHOD_FAILURE: 420, //phương thức thất bại
  MISDIRECTED_REQUEST: 421, //yêu cầu sai hướng
  UNPROCESSABLE_ENTITY: 422, //thực thể không thể xử lý
  LOCKED: 423, //lỗi khóa
  FAILED_DEPENDENCY: 424, //phụ thuộc thất bại
  PRECONDITION_REQUIRED: 428, //yêu cầu tiền điều kiện
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431, //trường tiêu đề yêu cầu quá lớn
  UNAVAILABLE_FOR_LEGAL_REASONS: 451, //không khả dụng vì lý do pháp lý
  INTERNAL_SERVER_ERROR: 500, //lỗi máy chủ nội bộ
  NOT_IMPLEMENTED: 501, //chưa được triển khai
  BAD_GATEWAY: 502, //cổng lỗi
  SERVICE_UNAVAILABLE: 503, //dịch vụ không khả dụng
  HTTP_VERSION_NOT_SUPPORTED: 505, //phiên bản HTTP không được hỗ trợ
  INSUFFICIENT_STORAGE: 507, //không đủ bộ nhớ
  NETWORK_AUTHENTICATION_REQUIRED: 511, //yêu cầu xác thực mạng
};
