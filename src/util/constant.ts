export const REQUEST_STATUS = {
    OK: 200, //Trả về thành công cho những phương thức GET, PUT, PATCH hoặc DELETE.
    CREATED: 201, //Trả về khi một Resouce vừa được tạo thành công.
    NO_CONTENT: 204, //Trả về khi Resource xoá thành công.
    NOT_MODIFIED: 304, //Client có thể sử dụng dữ liệu cache.
    BAD_REQUEST: 400, //Request không hợp lệ.
    UNAUTHORIZED: 401, //Request cần có auth.
    FORBIDDEN: 403, //Bị từ chối không cho phép.
    NOT_FOUND: 404, //Không tìm thấy resource từ URI.
    METHOD_NOT_ALLOWED: 405, //Phương thức không cho phép với user hiện tại.
    GONE: 410, //Resource không còn tồn tại, Version cũ đã không còn hỗ trợ.
    UNSUPPORTED_MEDIA_TYPE: 415, //Không hỗ trợ kiểu Resource này.
    UNPROCESSABLE_ENTITY: 422, //Dữ liệu không được xác thực.
    TWO_MANY_REQUESTS: 429, //Request bị từ chối do bị giới hạn.
};

export const IS_ACTIVE = {
    ACTIVE: 1,
    UN_ACTIVE: 0,
};

export const ROLE = {
    ADMIN: 1,
    USER: 2,
};

export const PAYMENT_STATUS = {
    PENDING: 1,
    PAID: 2,
};

export const ORDER_STATUS = {
    WAIT_FOR_CONFIRMATION: 1,
    CONFIRM: 2,
    DELIVERY: 3,
    COMPLETE: 4,
    REFUND: 5,
};
