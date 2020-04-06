<template>
  <div class="mv-list-container">
    <SongList></SongList>
    <!-- top 10 MV -->
    <MVContent></MVContent>
  </div>
</template>

<script>
import SongList from "./song-list/index";
import MVContent from "./mv/index";
export default {
  components: {
    SongList,
    MVContent
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.mv-list-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
