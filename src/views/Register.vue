<template>
	<el-form ref="form" :rules="rules" :model="loginInfo" class="form" label-width="100px">
		<el-form-item label="用户名" prop="username">
			<el-input v-model="loginInfo.username"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="password">
			<el-input v-model="loginInfo.password"></el-input>
		</el-form-item>
		<el-form-item label="重复密码" prop="repeatePassword">
			<el-input v-model="loginInfo.repeatePassword"></el-input>
		</el-form-item>
		<el-form-item class="center">
			<el-button type="primary" @click="submitForm">登陆</el-button>
			<el-button type="primary">注册</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				loginInfo: {
					username: '',
					password: '',
					repeatePassword: ''
				},
				rules: {
					username: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			submitForm() {
				this.$refs['form'].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		}
	}
</script>

<style>

</style>
