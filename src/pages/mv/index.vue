<template>
  <div class="mv-wrap">
    <div class="title">TOP 10 MV</div>
    <div class="mv-list" v-for="item in mvList" :key="item.id">
      <VideoComponent :videoInfo="item"></VideoComponent>
    </div>
  </div>
</template>

<script>
import VideoComponent from "@/components/VideoComponent";
import { getPopularList, getMvURL } from "@/api/mv";
export default {
  components: { VideoComponent },
  data() {
    return {
      mvList: []
    };
  },
  methods: {
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
.mv-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .title {
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 2em;
    color: rgb(211, 99, 35);
  }
  .mv-list {
    display: inline-block;
    padding: 0 20px;
    margin: 30px 20px 0 0;
  }
}
</style>
