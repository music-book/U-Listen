<template>
  <div class="audio-wrap">
    <!--<audio :src="song.src" controls></audio>-->
    <AudioPlayer :music="song" :showLrc="true"></AudioPlayer>
  </div>
</template>

<script>
import AudioPlayer from "vue-aplayer";
import Audio from "../pages/audio-visible/audio";
export default {
  components: {Audio, AudioPlayer },
  props: {
    song: {
      type: Object,
      required: true
    },
    list: {
      type: Array
    }
  },
  methods: {},
  mounted() {}
};
</script>

<style>
.audio-wrap {
  display: inline-block;
  width: 300px;
}
</style>
