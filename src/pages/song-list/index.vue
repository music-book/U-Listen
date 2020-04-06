<template>
  <div class="song-wrap">
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
      <el-button round type="mini" @click="login">登录</el-button>
    </div>
    <div class="song-list-content" v-loading="loading">
      <SingleSong
        v-for="song in songList"
        :key="song.id"
        :song="song"
      ></SingleSong>
    </div></div
></template>

<script>
import SingleSong from "@/components/MusicList";
import { search, getSongURL } from "@/api/search";
import { loginByPhone } from "@/api/login";
import { getLyric, getSongDetail } from "@/api/song";
import typeList from "@/utils/typeOptions";
import defaultList from "./default";
export default {
  components: {
    SingleSong
  },
  data() {
    return {
      songList: defaultList || [],
      search: "周杰伦",
      type: 1,
      typeList: typeList,
      loading: false
    };
  },

  methods: {
    login() {
      loginByPhone(13824397591, "").then(() => {});
    },
    convertSongs(songs, urlArray) {
      let songsInfo = [];
      songs.forEach(item => {
        let artists = item.artists.map(i => i.name).join();
        urlArray.forEach(el => {
          if (el.id === item.id) {
            let obj = {
              src: el.url,
              title: item.name,
              artist: artists,
              pic: el.pic ? el.pic : item.album.artist.img1v1Url,
              lrc: el.lyric,
              theme: "rgb(211, 99, 35)"
            };
            songsInfo.push(obj);
          }
        });
      });
      return songsInfo;
    },

    async serachMusic(value) {
      this.loading = true;
      let results = await search(value, 10, this.type);
      let songs = results.data.result.songs;
      let list = [];
      for (let i = 0, len = songs.length; i < len; i++) {
        let singleSong = await getSongURL(songs[i].id);
        let songLyric = await getLyric(songs[i].id);
        let songDetail = await getSongDetail(songs[i].id);
        let songInfo = singleSong.data.data[0];
        let details = songDetail.data.songs[0].al.picUrl;
        try {
          songInfo.lyric = songLyric.data.lrc.lyric;
          songInfo.pic = details;
        } catch (error) {
          console.log(error);
        }

        list.push(songInfo);
      }

      this.songList = this.convertSongs(songs, list);
      this.loading = false;
    }
  }
};
</script>

<style lang="less" scoped>
.song-wrap {
  width: 100%;
  min-height: 500px;
  .main-title {
    font-style: italic;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 150px;
    font-size: 1.5rem;
    background-color: rgb(110, 172, 207);
  }

  .search-wrap {
    display: flex;
    flex-direction: row;
    width: 30%;
    padding: 20px;
  }

  .song-list-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20px;
    margin-bottom: 30px;
  }
}
</style>
