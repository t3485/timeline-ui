<template>
  <el-container class="container">
    <el-header>
      <nav>     
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav>      
    </el-header>
    <el-main>
      <router-view/>   
    </el-main>
    <el-footer>
      
     </el-footer>
  </el-container>
</template>
<style lang="stylus">
body
  margin 0
  padding 0
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
nav
  padding 20px 80px 
.container  
  min-height 100vh
</style>
