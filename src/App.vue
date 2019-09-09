<template>
  <el-container class="container">
    <el-header>
      <el-row type="flex" tag="nav">
        <el-col :span="10">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
        </el-col>
        <el-col :span="4" class="nav-title">
          <span>{{timeline.title}}</span>
        </el-col>
        <el-col :span="10" class="right" v-if="$store.getters.isLogin">
          <a>{{$store.getters.authInfo.userName}}</a>
          <a href="#" @click="$store.commit('clearAuthToken')">exit</a>
        </el-col>
        <el-col :span="10" class="right" v-else>
          <router-link to="login">Login</router-link>
          <router-link to="register">Register</router-link>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>

    </el-footer>
  </el-container>
</template>
<script>
  import './css/style.css'
  export default {
    name: 'app',
    computed: {
      timeline: function() {
        return this.$store.state.timeline
      }
    }
  }
</script>
<style lang="stylus">
body,h3,p 
  margin: 0;
  padding: 0;

body
  background:#f8fafc

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
nav
  & a
    margin-right 30px
  padding 20px 80px
.container  
  min-height 100vh
.nav-title
  text-align center
  font-weight bold
.right
  text-align right
</style>
