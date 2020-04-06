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
