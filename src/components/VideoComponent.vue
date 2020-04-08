<template>
  <div class="video-container">
    <video
      height="200px"
      :poster="videoInfo.cover"
      :src="videoInfo.url"
      controls
      controlslist="nodownload"
    ></video>
  </div>
</template>

<script>
export default {
  props: {
    videoInfo: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
/* .video-container{
    widows: 200px;
} */
</style>
