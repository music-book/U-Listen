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
        <div v-show="false">{{ getAlbum(item.id) }}</div>
        <div v-for="i in comments" :key="i.time">
          <div class="comments">
            <el-avatar :src="i.avatar"></el-avatar>
            <span>{{ i.nickname }}</span>
            <span>{{ convertTime(i.time) }}</span>
          </div>
          <div class="content">{{ i.content }}</div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { getAlbumComment } from "@/api/album";
export default {
  props: {
    list: {
      type: Array
    }
  },
  data() {
    return {
      comments: [],
      counts: 0
    };
  },
  methods: {
    convertTime(timeStap) {
      let date = new Date(timeStap);
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    },
    async getAlbum(id) {
      if (this.counts < 10) {
        let results = await getAlbumComment(id);
        this.counts++;
        let comments = results.data.comments;
        let commentsInfo = [];
        comments.forEach(item => {
          commentsInfo.push({
            nickname: item.user.nickname,
            avatar: item.user.avatarUrl,
            content: item.content,
            time: item.time
          });
        });
        this.comments = commentsInfo;
      }
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

  .comments {
    display: flex;
    align-items: flex-start;

    .child {
      flex: 0 0 33%;
    }
    & > span {
      color: gray;
      font-size: 6px;
      padding: 0 8px;
    }
  }
  .content {
    position: relative;
    margin: -20px 0 20px 50px;
    height: 20px;
    line-height: 20px;
  }
}
</style>
