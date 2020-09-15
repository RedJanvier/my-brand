export default class Response {
  static success(res, status = 200, data = {}, message = 'Successfull') {
    return res.status(status).json({
      status,
      message,
      data,
    });
  }

  static error(
    res,
    status = 500,
    message = 'Internal server error',
    data = {}
  ) {
    return res.status(status).json({
      status,
      message,
      data,
    });
  }
}
