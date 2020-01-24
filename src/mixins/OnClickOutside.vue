<script>
export default {
  props: {
    do: {
      type: Function,
      required: true
    },
    params: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    const listener = event => {
      if (event.target !== this.$el && !this.$el.contains(event.target)) {
        this.do(event, ...this.params)
      }
    }
    document.addEventListener('click', listener)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('click', listener)
    })
  },
  render() {
    return this.$slots.default[0]
  }
}
</script>
