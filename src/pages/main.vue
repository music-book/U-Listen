<template>
  <div class="mv-list-container">
    <div class="main-title">U-Listen,听见不一样到世界</div>
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

    <div class="title">TOP 10 MV</div>
    <div class="mv-list" v-for="item in mvList" :key="item.id">
      <VideoComponent :videoInfo="item"></VideoComponent>
    </div>
  </div>
</template>

<script>
import { getPopularList, getMvURL } from "../api/mv";
import { search, getSongURL } from "../api/search";
import typeList from "../utils/typeOptions";
import VideoComponent from "../components/VideoComponent";
import SingleSong from "../components/MusicList";
export default {
  components: {
    VideoComponent,
    SingleSong
  },
  data() {
    return {
      mvList: [],
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
    },
    getMv() {
      getPopularList().then(res => {
        let mvRestulsList = res.data.data;
        let ids = mvRestulsList.map(item => item.id);
        let list = [];

        ids.forEach(id => {
          getMvURL(id).then(mvDetail => {
            let result = mvDetail.data.data;
            let url = result.url;
            let id = result.id;
            list.push({ url: url, id: id });
          });
        });

        this.mvList = list;
      });
    }
  },
  mounted() {
    this.getMv();
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
  .title {
    display: inline-block;
    width: 100%;
    text-align: center;
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
  .mv-list {
    display: block;
    padding: 0 20px;
    margin: 30px 20px 0 0;
  }
}
</style>
