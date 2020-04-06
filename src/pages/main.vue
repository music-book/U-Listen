<template>
  <div class="mv-list-container">
    <div class="main-title">U-Listen,听见不一样的世界</div>
    <div class="search-wrap">
      <el-input
        placeholder="请输入内容"
        v-model="search"
        @change="serachMusic"
        class="input-with-select"
      >
        <el-select v-model="type" slot="prepend" placeholder="搜索类型">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.type"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="serachMusic"
        ></el-button>
      </el-input>
    </div>
    <div class="song-list-content">
      <SingleSong
        v-for="item in songList"
        :key="item.id"
        :song="item"
      ></SingleSong>
    </div>
    <!-- top 10 MV -->
    <MVContent></MVContent>
  </div>
</template>

<script>
import { search, getSongURL } from "@/api/search";
import typeList from "@/utils/typeOptions";
import MVContent from "./mv/index";
import SingleSong from "@/components/MusicList";
export default {
  components: {
    SingleSong,
    MVContent
  },
  data() {
    return {
      songList: [],
      search: "",
      type: 1,
      typeList: typeList
    };
  },
  methods: {
    async serachMusic(value) {
      let results = await search(value, 10, this.type);
      let songs = results.data.result.songs;
      let list = [];
      for (let i = 0, len = songs.length; i < len; i++) {
        let singleSong = await getSongURL(songs[i].id);
        let songInfo = singleSong.data.data[0];
        list.push(songInfo);
      }
      this.songList = list;
    }
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
  .main-title {
    font-style: italic;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;
    font-size: 1.5rem;
    background-color: rgb(110, 172, 207);
  }

  .search-wrap {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 30%;
    padding: 20px;
  }

  .song-list-content {
    display: inline-block;
  }
}
</style>
