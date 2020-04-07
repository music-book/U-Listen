import request from "@/utils/request";

// 搜索
export async function searchSong(words, limit = 10, type = 1) {
  let results = request({
    url: "/search",
    params: {
      keywords: words,
      limit: limit,
      type: type
    }
  });
  return results;
}

// 搜索建议
export async function searchSuggest(words) {
  let results = request({
    url: "/search/suggest",
    params: {
      keywords: words
    }
  });

  return results;
}

// 获取歌曲URL
export async function getSongURL(id) {
  let results = request({
    url: "/song/url",
    params: {
      id: id
    }
  });

  return results;
}
