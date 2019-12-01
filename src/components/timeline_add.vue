<template>
	<el-dialog title="添加" :visible.sync="isvisible">
		<el-form :model="item">
			<el-form-item label="id" :label-width="formLabelWidth">
				<el-input v-model="item.id" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="标题" :label-width="formLabelWidth">
				<el-input v-model="item.info" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="日期" :label-width="formLabelWidth">
				<el-date-picker v-model="item.date" type="date" placeholder="选择日期"></el-date-picker>
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
		created(){
			if (Boolean(this.item.id)){
				this.item.id == 0;
			}
		},
		data() {
			return {
				formLabelWidth: "200"
			}
		},
		props: ['visible', 'item'],
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
