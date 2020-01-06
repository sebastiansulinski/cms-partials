<script>
    export default {
        created() {
            const listener = event => {
                if (event.key === 'Escape') {
                    this.handleEscape()
                }
            }
            document.addEventListener('keydown', listener)
            this.$once('hook:beforeDestroy', () => {
                document.removeEventListener('keydown', listener)
            })
        },
        methods: {
            handleEscape() {
            }
        }
    }
</script>
