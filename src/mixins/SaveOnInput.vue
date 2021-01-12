<script>
import AjaxCaller from './AjaxCaller'
import ErrorReporter from '../core/ErrorReporter'
export default {
  name: 'SaveOnInput',
  mixins: [AjaxCaller],
  props: {
    field: {
      type: String,
      required: true
    },
    event: {
      type: String,
      default: 'input'
    },
    errorMessage: {
      type: String,
      default: 'Invalid input',
    },
  },
  data() {
    return {
      response: {}
    }
  },
  methods: {
    call(value) {
      this.startProcessingAjaxCall()
      this.makeAjaxRequest(
        response => {
          this.$emit(this.event, value)
          this.success(response)
        },
        this.failure,
        { [this.field]: value }
      )
    },
    success(response) {
      this.stopProcessingAjaxCall()
      this.response = response.data
    },
    failure(error) {
      if (
        (error.response || {}).status &&
        [301, 302].includes(error.response.status)
      ) {
        window.location.href = error.response.url
        return
      }
      ErrorReporter.report(
          ErrorReporter.message(error, this.errorMessage),
          this.field,
          this.stopProcessingAjaxCall
      )
    }
  },
  render() {
    return this.$scopedSlots.default({
      call: this.call,
      processing: this.processing,
      response: this.response
    })
  }
}
</script>
