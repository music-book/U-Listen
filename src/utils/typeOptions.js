//搜索类型；默认为 1 即单曲
// 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV,
// 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合

const typeList = [
  { type: "单曲", value: 1 },
  { type: "专辑", value: 10 },
  { type: "歌手", value: 100 },
  { type: "歌单", value: 1000 },
  { type: "用户", value: 1002 },
  { type: "MV", value: 1004 },
  { type: "歌词", value: 1006 },
  { type: "电台", value: 1009 },
  { type: "视频", value: 1014 },
  { type: "综合", value: 1018 }
];

export default typeList;
