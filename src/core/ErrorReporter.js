export default class ErrorReporter {
  static report(error, id = null, type = null, beforeCallback = null) {
    if (typeof beforeCallback === 'function') {
      beforeCallback();
    }
    EventBus.fire(type || 'top-warning', {
      id: id || 'top-warning',
      message: error,
    });
  }

  static message(error, message = null) {
    if (typeof error === 'string') {
      return error;
    }
    return (
      error.response?.data?.message ||
      message ||
      error?.message ||
      'Request failed'
    );
  }
}
