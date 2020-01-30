export default class ErrorReporter {
  static report(error, id = null, type = null, beforeCallback = null) {
    if (typeof beforeCallback === 'function') {
      beforeCallback()
    }
    EventBus.fire(type || 'top-warning', {
      id: id || 'top-warning',
      message: ErrorReporter.message(error)
    })
  }

  static message(error) {
    if (typeof error === 'string') {
      return error
    }
    return ((error.response || {}).data || {}).message || 'Request failed'
  }
}
