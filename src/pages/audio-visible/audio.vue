<template>
    <div class="visible-wrap">
        <div class="title">音频可视化，点击播放</div>
        <canvas width="700px" height="100px" class="canvas"></canvas>
        <audio src="@/assets/light.mp3" controls class="audio"></audio>
        <div class="btns">
            <el-button type="primary" @click="playMusic">播放</el-button>
            <el-button type="primary" @click="pause">暂停</el-button>
            <el-button type="primary">可视化类型</el-button>
        </div>
    </div>

</template>

<script>

    import Vudio from "vudio";
    import defaultType from '@/utils/waveType';
    export  default {
        props:{
            song:Object
        },
        data(){
            return {
                vudio:null,
                audio:null,
                options:defaultType
            }
        },
        methods:{
            pause(){
                this.vudio.pause();
                this.audio.pause();
            },

            playMusic(){
                this.vudio.dance()
                this.audio.play()
            },

            waveConfig (){
                const  config  = {
                    effect : 'waveform', // 当前只有'waveform'这一个效果，哈哈哈
                    accuracy : 128, // 精度,实际表现为波形柱的个数，范围16-16348，必须为2的N次方
                    width : 600, // canvas宽度，会覆盖canvas标签中定义的宽度
                    height : 100, // canvas高度，会覆盖canvas标签中定义的高度
                    waveform : {
                        maxHeight : 80, // 最大波形高度
                        minHeight : 1, // 最小波形高度
                        spacing: 0.6, // 波形间隔
                        color : "#f00", // 波形颜色，可以传入数组以生成渐变色
                        shadowBlur : 0, // 阴影模糊半径
                        shadowColor : '#f00', // 阴影颜色
                        fadeSide : true, // 渐隐两端
                        horizontalAlign : 'center', // 水平对齐方式，left/center/right
                        verticalAlign: 'middle' // 垂直对齐方式 top/middle/bottom
                    }
                }

                return config;
            },

            visibleHandle(){
                let audioObj = document.querySelector('.audio');
                let canvasObj = document.querySelector('.canvas');

                this.audio = audioObj;
                this.vudio = new Vudio(audioObj, canvasObj,this.waveConfig());

            }
        },
        mounted() {
            this.visibleHandle()
        }
    }
</script>

<style scoped lang="less">
    .visible-wrap{
        width: 100%;
        padding: 20px;
        .title{
            color: #409bcb;
        }
        .audio{
            visibility: hidden;
        }

        .canvas{
            cursor: pointer;
        }
    }
</style>

