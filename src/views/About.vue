<template>
  <table>
    <tr v-for="i in item" v-bind:key="i.id">
      <td>{{i}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  created() {
    let a = {Name:this.$route.params.id};
    this.$axios.get("http://localhost:29823/biz/t", {
        params: a
      }).then(r => {
        this.item = r.data;
      });
  },
  data() {
    return {
      item: []
    };
  }
};
</script>