<template>
	<el-dialog title="添加" :visible.sync="isvisible">
		<el-form :model="form">
			<el-form-item label="id" :label-width="formLabelWidth">
				<el-input v-model="form.id" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="标题" :label-width="formLabelWidth">
				<el-input v-model="form.info" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="日期" :label-width="formLabelWidth">
				<el-date-picker v-model="form.date" type="date" placeholder="选择日期"></el-date-picker>
				{{form.date}}
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="Cancel">取 消</el-button>
			<el-button type="primary" @click="OK">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		name: 'timeline_add',
		data() {
			return {
				formLabelWidth: "200",
				form: {
					info: '',
					date: '',
					id: 0
				}
			}
		},
		props: ['visible'],
		computed: {
			isvisible: {
				get() {
					return this.visible;
				},
				set() {
					this.$store.commit('setPopStatus', false);
				}
			}
		},
		methods: {
			OK() {
				this.isvisible = false;
				this.$emit('timeline:addOK', this.form);
			},
			Cancel() {
				this.isvisible = false;
			}
		}
	}
</script>

<style>
</style>
