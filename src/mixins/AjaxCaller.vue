<script>
import Processor from './Processor'
import ApiCaller from '../core/ApiCaller'
export default {
  mixins: [Processor],
  props: {
    action: {
      type: String,
      default: '/'
    },
    method: {
      type: String,
      default: 'post'
    }
  },
  computed: {
    endPoint() {
      return this.action
    },
    requestData() {
      return {}
    },
    requestConfig() {
      return {}
    }
  },
  methods: {
    makeAjaxCall(success, failure) {
      this.startProcessingAjaxCall()
      this.makeAjaxRequest(success, failure)
    },
    startProcessingAjaxCall() {
      this.startProcessing()
      this.startProcessingAjaxCallEvent()
    },
    startProcessingAjaxCallEvent() {},
    stopProcessingAjaxCall() {
      this.stopProcessing()
      this.stopProcessingAjaxCallEvent()
    },
    stopProcessingAjaxCallEvent() {},
    makeAjaxRequest(success, failure, payload, url, method) {
      ApiCaller.request(
        url || this.endPoint,
        method || this.method,
        payload || this.requestData,
        this.requestConfig
      )
        .then(success)
        .catch(failure)
    }
  }
}
</script>
