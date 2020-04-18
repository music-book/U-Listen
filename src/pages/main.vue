<template>
  <div class="mv-list-container">
    <!-- single song   -->
    <SongList></SongList>
    <!-- top 10 MV -->
    <MVContent></MVContent>
    <!-- disclaimer  -->
    <Ability class="ability"> </Ability>
  </div>
</template>

<script>
import SongList from "./song-list/index";
import MVContent from "./mv/index";
import Ability from "@/components/Ability";
export default {
  components: {
    SongList,
    MVContent,
    Ability
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
  overflow-x: hidden;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .ability {
    padding: 20px;
  }
}
</style>
