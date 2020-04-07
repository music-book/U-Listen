<template>
  <div class="album-wrap">
    <el-collapse accordion>
      <el-collapse-item v-for="item in list" :key="item.id">
        <template slot="title">
          <el-avatar :src="item.picUrl"></el-avatar>
          <div class="basic-info">
            {{ item.name }}
            {{ item.alias.length > 0 ? "(" + item.alias.join() + ")" : "" }}
            {{ convertTime(item.publishTime) }}
          </div>
        </template>
        <div>
          与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array
    }
  },
  data() {
    return {};
  },
  methods: {
    convertTime(timeStap) {
      let date = new Date(timeStap);

      return (
        date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate()
      );
    }
  }
};
</script>

<style lang="less" scoped>
.album-wrap {
  width: 100%;
  .basic-info {
    margin: 0 15px;
  }
}
</style>
