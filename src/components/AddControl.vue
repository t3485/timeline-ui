<template>
  <div class="fixed-right-bottom">
    <div @click="scrollTop" v-show="showBackTop">
      <i class="el-icon-caret-top" />
    </div>
    <div @click="$emit('add:click')" v-show="showAdd">
      <i class="el-icon-plus" />
    </div>
    <div @click="$router.go(-1)" v-show="showBack">
      <i class="el-icon-back" />
    </div>
  </div>
</template>

<script>
  export default {
    props: ['type'],
    data() {
      return {
        showAdd: false,
        showBackTop: false,
        showBack: false
      }
    },
    created() {
      if (this.type == 'add') {
        this.showAdd = true;
      } else if (this.type == 'top') {
        this.showBackTop = true;
      } else {
        this.showAdd = true;
        this.showBackTop = true;
        this.showBack = true;
      }
    },
    methods: {
      scrollTop() {
        window.scrollTo(0, 0);
      },
      scrollShow() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
          document.body.scrollTop;
        if (scrollTop < 100)
          this.showBackTop = false;
        else this.showBackTop = true;
      }
    },
    mounted() {
      if (this.showBackTop)
        window.addEventListener("scroll", this.scrollShow);
    },
    destroyed() {
      if (this.showBackTop)
        window.removeEventListener("scroll", this.scrollShow);
    }
  }
</script>

<style>
  .fixed-right-bottom {
    position: fixed;
    margin-left: 80%;
    bottom: 60px;
    font-size: 20px;
    width: 40px;
  }

  .fixed-right-bottom>div {
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 50%;
    line-height: 40px;
    color: #409eff;
    cursor: pointer;
    margin-bottom: 20px;
    box-shadow: 0 0 6px rgba(0, 0, 0, .12);
  }
</style>
