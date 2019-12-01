<template>
  <div>
    <div v-for="item in items" v-bind:key="item.id">
      <el-row type="flex">
          <el-col tag="caption">{{item.title}}</el-col>
      </el-row>
      <el-row type="flex" v-for="text in item.text" v-bind:key="text.id">
        <el-col :span="12" v-for="image in text.images" v-bind:key="image.id"><img :src="image.path" class="imagebox" /></el-col>
        <el-col :span="12">{{text.value}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 0,
          title: "侧面",
          text: [
            {
              id: 1,
              value: "f",
              images: [{ id:2, path: "http://localhost:8927/img/1.jpg", text: "", position: "" }]
            }
          ]
        }
      ]
    };
  }
};
</script>
<style>
.imagebox{
    max-width: 300px;
    max-height: 300px;
}
</style>