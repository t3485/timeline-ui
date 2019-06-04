<template>
	<el-table highlight-current-row @current-change="change" :data="timelineData">
		<el-table-column type="index"></el-table-column>
		<el-table-column property="title" label="标题"></el-table-column>
		<el-table-column property="creator" label="创建者"></el-table-column>
		<el-table-column property="creationTime" label="创建时间"></el-table-column>
		<el-table-column property="creator" label="权限"></el-table-column>
	</el-table>
</template>

<script>
	export default {
		created: function() {
			this.$axios.get('/services/app/TimeAxisService/GetAxes', {
				params: {
					SkipCount: 0,
					MaxResultCount: 10
				}
			}).then(res => {
				this.timelineData = res.data.result.items;
			})
		},
		data() {
			return {
				timelineData: []
			}
		},
		methods: {
			change(currentRow) {
				this.$store.commit('setTimeline', {
					title: currentRow.title,
					id: 1
				});
				this.$router.push({
					name: 'item',
					params: {
						id: currentRow.id
					}
				})
			}
		}
	}
</script>

<style>
</style>
