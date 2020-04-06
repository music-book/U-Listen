import request from "@/utils/request";

// 歌词
export async function getLyric(id) {
  let results = request({
    url: "/lyric",
    params: {
      id: id
    }
  });
  return results;
}

// 获取歌曲详情
export async function getSongDetail(ids) {
  let results = request({
    url: "/song/detail",
    params: {
      ids: ids
    }
  });
  return results;
}
