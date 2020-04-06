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
      <el-button
        v-if="loginStatus"
        class="login-btn"
        round
        type="mini"
        @click="dialogVisible = true"
        >登录</el-button
      >
      <div v-else class="logined">
        <el-avatar :src="avatar" alt="user"
          ><span>欢迎登录{{ name }}</span></el-avatar
        >
      </div>
      <el-dialog title="登录" :visible.sync="dialogVisible" width="30%">
        <div>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="手机号" prop="phone">
              <el-input
                type="text"
                v-model="ruleForm.phone"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login">提交</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
    <div class="song-list-content" v-loading="loading">
      <SingleSong
        v-for="song in songList"
        :key="song.id"
        :song="song"
      ></SingleSong>
    </div>
  </div>
</template>

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
      loading: false,
      dialogVisible: false,
      ruleForm: {
        phone: "",
        password: ""
      },
      rules: {
        phone: [{ validator: null, trigger: "blur" }],
        password: [{ validator: null, trigger: "blur" }]
      },
      loginStatus: true,
      avatar: "",
      name: ""
    };
  },

  methods: {
    login() {
      const { phone, password } = this.ruleForm;
      loginByPhone(phone, password).then(loginInfo => {
        // console.log(loginInfo);
        let data = loginInfo.data;
        let code = data.code;

        if (code !== 200) return this.$message.error("用户名或密码错误");

        this.$message.success("登录成功");
        this.dialogVisible = false;
        this.loginStatus = false;
        this.avatar = data.profile.avatarUrl;
        this.name = data.account.userName;
      });
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
  .login-btn {
    float: right;
    margin-left: 20px;
  }

  .logined {
    display: inline-block;
    padding: 0 20px;
    min-width: 200px;
    height: 50px;
    line-height: 50px;
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
