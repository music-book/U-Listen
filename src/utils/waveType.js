const visibleType =  {
  effect : 'waveform', // 当前只有'waveform'这一个效果，哈哈哈
  accuracy : 128, // 精度,实际表现为波形柱的个数，范围16-16348，必须为2的N次方
  width : 600, // canvas宽度，会覆盖canvas标签中定义的宽度
  height : 100, // canvas高度，会覆盖canvas标签中定义的高度
  waveform : {
    maxHeight : 80, // 最大波形高度
    minHeight : 1, // 最小波形高度
    spacing: 1, // 波形间隔
    color : '#f00', // 波形颜色，可以传入数组以生成渐变色
    shadowBlur : 0, // 阴影模糊半径
    shadowColor : '#f00', // 阴影颜色
    fadeSide : true, // 渐隐两端
    horizontalAlign : 'center', // 水平对齐方式，left/center/right
    verticalAlign: 'middle' // 垂直对齐方式 top/middle/bottom
  }
}

export {visibleType}