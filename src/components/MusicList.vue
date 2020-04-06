<template>
  <div class="audio-wrap">
    <AudioPlayer :music="song" :showLrc="true" :float="true"></AudioPlayer>
  </div>
</template>

<script>
import AudioPlayer from "vue-aplayer";
export default {
  components: { AudioPlayer },
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
