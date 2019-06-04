<template>
	<el-form ref="form" :model="loginInfo" class="form">
		<el-form-item>
			<el-input v-model="loginInfo.username" placeholder="用户名"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input type="password" v-model="loginInfo.password" placeholder="密码"></el-input>
		</el-form-item>
		<el-form-item class="center">
			<el-switch v-model="loginInfo.rememberMe" active-text="记住登陆">
			</el-switch>
		</el-form-item>
		<el-form-item class="center">
			<el-button type="primary" @click="login">登陆</el-button>
			<el-button type="primary">注册</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				loginInfo: {
					username: 'admin',
					password: '123qwe',
					rememberMe: true
				}
			}
		},
		methods: {
			login() {
				this.$axios.post('TokenAuth/Authenticate', {
					userNameOrEmailAddress: this.loginInfo.username,
					password: this.loginInfo.password,
				}).then(res => {
					if (res.data.success) {
						this.$store.commit('setAuthToken', {
							token: res.data.result.accessToken,
							rememberMe: this.loginInfo.rememberMe
						});
						this.$axios.get(`services/app/User/Get`, {
							params: {
								Id: res.data.result.userId
							}
						}).then(res => {
							if (res.data.success) {
								this.$store.commit('setUserInfo', res.data.result);
								this.$message({
									message: '登陆成功',
									type: 'success'
								});
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
</style>
