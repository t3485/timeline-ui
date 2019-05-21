<template>
	<div>
		<timeline @update:title="title=$event"></timeline>
	</div>
</template>

<script>
	// @ is an alias to /src
	import timeline from '@/components/timeline.vue'
	import HelloWorld from '@/components/HelloWorld.vue'

	export default {
		name: 'home',
		components: {
			HelloWorld,
			timeline
		},
		data() {
			return {
				title: ''
			}
		}
	}
</script>
