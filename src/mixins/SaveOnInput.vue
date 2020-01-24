<script>
import AjaxCaller from './AjaxCaller'
import ErrorHandler from '../core/ErrorHandler'
export default {
  mixins: [AjaxCaller],
  props: {
    field: {
      type: String,
      required: true
    },
    event: {
      type: String,
      default: 'input'
    }
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
      ErrorHandler.showError(error, this.stopProcessingAjaxCall)
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
